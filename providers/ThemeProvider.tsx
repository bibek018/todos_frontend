import { ThemeProvider as NextThemeProvider } from "next-themes"
export const ThemeProvier =({children}:{children:React.ReactNode})=>{
    return(
        <NextThemeProvider>
            {children}
        </NextThemeProvider>
    )
}