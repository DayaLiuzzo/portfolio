// tester si remplacer localhost:4430 par '' fonctionne au sein des fetch;




export default class BaseView{
    constructor(router, params = {}){
        this.router = router
        this.projects = this.router.projects;
        this.about = this.router.about;
        this.params = params;
        this.canva = document.getElementById('canva');
        if (!this.canva) {
            console.error("Error: Element with id 'canva' not found in document");
        }
    }

    render(){
        return `<div>Base View</div>`;
    }

   
    async mount(){
    }


    async navigateTo(path){
        this.router.navigateTo(path);
    }


    unmount(){
        console.log("BaseView unmounted");
    }

    attachEvents(){
        console.log('Events attached');
    }


}
