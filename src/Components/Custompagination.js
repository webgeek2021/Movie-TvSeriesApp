import { createTheme , ThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
function CustomPagination(props){
    const numberOfPages = props.total_pages
    const customtheme = createTheme({
      palette:{type:"dark"}  
    })
    const handleChange = (event , value) => {
        props.setPage(value)
        window.scroll(0,0)
    }
    const style_page = {
        display:"flex",
        width:"100%",
        justifyContent: "center",
        marginTop:"20px"
    }
    return(
        <div style={style_page}>
            <ThemeProvider theme={customtheme}>
            <Pagination 
                count= {numberOfPages}
                onChange={handleChange}
            />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination;