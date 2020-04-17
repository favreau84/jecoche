const storage = {
    saveProfile: function(profile){
        for(let field in profile){
            localStorage.setItem(field,profile[field])
        }
    },
    getProfile: function(){
        return {...localStorage}
    }
}
export default storage