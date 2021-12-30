Vue.createApp({
    data() {
        return {
            title: "Commit on Discloud",
            botID: "",
            apiToken: "",
            status: ""
        }
    },
    methods: {
        commit(e) {
            e.preventDefault();

            const file = document.getElementById("file").files[0];

            if (file === undefined || this.botID === "" || this.apiToken === "") {
                this.status = "Please fill all fields";
                alert("Please fill in all fields");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            const config = {
                headers: {
                    "api-token": this.apiToken,
                    "Content-Type": "multipart/form-data"
                }
            };

            this.status = "Committing...";

            axios.post(`https://discloud.app/status/bot/${this.botID}/commit`, formData, config)
                .then(response => {
                    this.status = response.data.message;
                    alert(response.data.message);
                })
                .catch(error => {
                    this.status = error.response.data.message;
                    alert(error.response.data.message);
                });
        }
    }
}).mount('#app')