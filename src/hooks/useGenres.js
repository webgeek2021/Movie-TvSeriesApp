const useGenres = (selectedGenres)=>{
    if(selectedGenres.length === 0)
            return "";
        

        const Ids = selectedGenres.map((g)=>g.id)
        return Ids.reduce((acc,curr)=> acc + "," + curr);
}

export default useGenres