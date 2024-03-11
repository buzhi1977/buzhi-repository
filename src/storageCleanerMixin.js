const storageCleanerMixin={
    beforeDestroy(){
        sessionStorage.clear();
    }
}
export default storageCleanerMixin;