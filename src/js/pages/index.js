define(['axios'], function(axios) {
    const init = () => {
        let btn = document.getElementById('btn');
        btn.addEventListener('click', function() {
            let uVal = document.getElementById('user').value.trim();
            let pVal = document.getElementById('pwd').value.trim();
            if (!uVal || !pVal) {
                return;
            }
            axios.post('/users/login', { 'user': uVal, "pwd": pVal }).then(rs => {
                // console.log(rs)
                if (rs.data.code) {
                    location.href = "index.html?userID=" + rs.data.data[0]._id
                }
            })
        })
    }
    init();
})