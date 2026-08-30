"use client";

import api from "@/lib/app";
import {
  todo,
  todoResponse,
  TodoState,
  TodoStatus,
  TodoPriority,
  TodoSortNOrder,
  TodoPagination,
} from "@/types/type";
import { TodoDisplay } from "./TodoDisplay";
import { TodoSkeleton } from "./TodoSkeleton";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { TodoAdd } from "./TodoAdd";
import { TodoError } from "./TodoError";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export const TodoConfig = () => {
  const [status, setStatus] = useState<TodoState>("loading");
  const { user, isLoading } = useAuth();

  const [userTodos, setUserTodos] = useState<todo[]>([]);

  const [todoStatus, setTodoStatus] = useState<TodoStatus | "">("");
  const [todoPriority, setTodoPriority] = useState<TodoPriority | "">("");
  const [sortNOrder, setSortNOrder] =
    useState<TodoSortNOrder>("createdAt-desc");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [pagination, setPagination] = useState<TodoPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  /* 
     Handle API Calls
   */

  const getUserTodos = async () => {
    setStatus("loading");

    try {
      const [sort, order] = sortNOrder.split("-");

      const response = await api.get<todoResponse>("/todos", {
        params: {
          page,
          limit,
          ...(sort && { sort }),
          ...(order && { order }),
          ...(todoStatus && { status: todoStatus }),
          ...(todoPriority && { priority: todoPriority }),
        },
      });

      setUserTodos(response.data.todos);
      setPagination(response.data.pagination);
      setStatus("success");
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  };

  /* 
     Handle Filter Reset
   */

  const handleReset = () => {
    setTodoPriority("");
    setTodoStatus("");
    setSortNOrder("createdAt-desc");
    setPage(1);
  };

  /* 
     Handle Page Numbers
   */

  const getPageNumbers = (): (number | "...")[] => {
    const totalPages = pagination.totalPages;
    const currentPage = pagination.page;

    // 1–5 pages → show everything
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    // Near the beginning
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    // Near the end
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // Somewhere in the middle
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  /* 
     Fetch Todos
   */

  useEffect(() => {
    if (!isLoading && user) {
      getUserTodos();
    }
  }, [isLoading, user, todoStatus, todoPriority, sortNOrder, page, limit]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Workspace Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Workspace Dashboard
          </h2>

          <p className="mt-1.5 text-sm text-muted-foreground">
            Review active tasks, update progression status, and add new items.
          </p>
        </div>
      </div>

      {/* Filter and Sort Implementation */}
      <section className="flex flex-wrap items-center gap-3">
        <Label htmlFor="status" className="text-accent-foreground">
          Status:
        </Label>

        <select
          name="status"
          id="status"
          value={todoStatus}
          className="select select-sm bg-accent text-accent-foreground w-32"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setTodoStatus(e.target.value as TodoStatus | "");
            setPage(1);
          }}
        >
          <option value="" className="font-bold">
            All Statuses
          </option>

          <option value="not started">Not Started</option>

          <option value="in progress">In Progress</option>

          <option value="completed">Completed</option>
        </select>

        <Label htmlFor="priority" className="text-accent-foreground">
          Priority:
        </Label>

        <select
          name="priority"
          id="priority"
          value={todoPriority}
          className="select select-sm bg-accent text-accent-foreground w-32"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setTodoPriority(e.target.value as TodoPriority | "");
            setPage(1);
          }}
        >
          <option value="" className="font-bold">
            All Priorities
          </option>

          <option value="low">Low</option>

          <option value="medium">Medium</option>

          <option value="high">High</option>
        </select>

        <Label htmlFor="sort" className="text-accent-foreground">
          Sort:
        </Label>

        <select
          name="sort"
          id="sort"
          value={sortNOrder}
          className="select select-sm bg-accent text-accent-foreground w-32"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSortNOrder(e.target.value as TodoSortNOrder);
            setPage(1);
          }}
        >
          <option value="createdAt-desc">Newest</option>

          <option value="createdAt-asc">Oldest</option>

          <option value="updatedAt-desc">Recently Updated</option>

          <option value="title-asc">Title A-Z</option>

          <option value="title-desc">Title Z-A</option>
        </select>

        <Button className="bg-primary" onClick={handleReset}>
          Clear Filters
        </Button>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Todo List */}

        {/* Status Success */}
        {status === "success" && (
          <div className="w-full lg:col-span-8 order-2 lg:order-1 space-y-6">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Your Tasks
              </h3>

              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                {userTodos.length}{" "}
                {pagination.total === 1 ? "task found" : "tasks found"}
              </span>
            </div>

            {userTodos.length > 0 ? (
              <>
                {/* Todo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userTodos.map((todo: todo) => (
                    <TodoDisplay
                      key={todo._id}
                      todo={todo}
                      setUserTodos={setUserTodos}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <footer className="flex flex-col gap-2">
                    {/* Pagination Information */}
                    <section className="flex flex-wrap justify-between gap-2">
                      <span className="text-muted-foreground">
                        Showing {(pagination.page - 1) * pagination.limit + 1} -{" "}
                        {Math.min(
                          pagination.page * pagination.limit,
                          pagination.total,
                        )}{" "}
                        of {pagination.total} tasks
                      </span>

                      <span className="text-muted-foreground">
                        Rows per page:{" "}
                        <select
                          name="limit"
                          id="limit"
                          value={limit}
                          className="select select-sm bg-accent text-accent-foreground w-32"
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>,
                          ) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                          }}
                        >
                          <option value="5">5</option>

                          <option value="10">10</option>

                          <option value="15">15</option>

                          <option value="20">20</option>
                        </select>
                      </span>
                    </section>

                    {/* Pagination Buttons */}
                    <section className="flex justify-center items-center">
                      <div className="flex gap-2">
                        {/* Previous */}
                        <Button
                          disabled={pagination.page === 1}
                          className="bg-primary"
                          onClick={() => setPage((prev) => prev - 1)}
                        >
                          Previous
                        </Button>

                        {/* Page Numbers */}
                        {getPageNumbers().map((pageNumber, index) =>
                          pageNumber === "..." ? (
                            <span
                              key={`ellipsis-${index}`}
                              className="px-2 text-muted-foreground"
                            >
                              ...
                            </span>
                          ) : (
                            <Button
                              key={pageNumber}
                              className={
                                pageNumber === pagination.page
                                  ? "bg-primary text-primary-foreground w-fit"
                                  : "bg-accent text-accent-foreground hover:bg-accent/80 w-fit"
                              }
                              onClick={() => setPage(pageNumber)}
                            >
                              {pageNumber}
                            </Button>
                          ),
                        )}

                        {/* Next */}
                        <Button
                          disabled={pagination.page === pagination.totalPages}
                          className="bg-primary"
                          onClick={() => setPage((prev) => prev + 1)}
                        >
                          Next
                        </Button>
                      </div>
                    </section>
                  </footer>
                )}
              </>
            ) : (
              /* No Tasks */
              <div className="rounded-3xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center backdrop-blur-xs">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>

                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  No tasks found
                </h3>

                <p className="mt-2 text-xs text-muted-foreground">
                  Get started by creating a new task on the right.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Status Loading */}
        {status === "loading" && (
          <div className="w-full lg:col-span-8 order-2 lg:order-1">
            <TodoSkeleton />
          </div>
        )}

        {/* Status Error */}
        {status === "error" && (
          <div className="w-full lg:col-span-8 order-2 lg:order-1">
            <TodoError getUserTodos={getUserTodos} />
          </div>
        )}

        {/* Right Side: Add Todo */}
        <div className="w-full lg:col-span-4 order-1 lg:order-2 lg:sticky lg:top-6">
          <TodoAdd getUserTodos={getUserTodos} setStatus={setStatus} />
        </div>
      </div>
    </div>
  );
};
