function Login() {

    async function postData(data = {}) {
        const url = "api/login/";
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        return response;
    }

    function clickedLogin() {
        const email = document.getElementById('email_text').value;
        const password = document.getElementById('password_text').value;
        const res = postData({ "email": email, "password": password });
        res.then((data) => {
            console.log(data.data);
        })
    }


    return <div>
        <input type="text" placeholder="email" name="email" id="email_text" />
        <input type="text" placeholder="password" name="password" id="password_text" />
        <button type="submit" onClick={() => clickedLogin()}>Login</button>
    </div>;
}

export default Login;