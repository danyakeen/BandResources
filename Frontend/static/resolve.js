export async function senddata(endpoint, data) {
    console.log(data)
    const f = await fetch(
        origin + endpoint, {
        method: "POST",
        body: data
    });
    // display(await f.text());
}


function display(text,isreq) {
    let prompt = document.createElement("p");
    prompt.classList.add(isreq ? "request" : "response");
    chatarea.appendChild(prompt);
    prompt.textContent = text;
}