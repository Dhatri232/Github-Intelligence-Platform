import { useEffect } from "react";

function Test() {

    useEffect(() => {

        fetch("http://localhost:5000/hello")
            .then(res => res.json())
            .then(data => console.log(data));

    }, []);

    return <h1>Testing API</h1>;
}

export default Test;