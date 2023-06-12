export default async function ( {prompt, negativePrompt, seed, amount} ) { 

    const data= {
        "prompt":  'photo of alexensual man ' + prompt,
        'negative_prompt' : negativePrompt,
        "steps": 10,
        "sampler_index": "Euler a",
        'seed': seed,
        'n_iter': amount > 4 ? 4 : amount 
    } 

    const res = await fetch('http://127.0.0.1:7860/sdapi/v1/txt2img', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
    }); 


    if (res.ok) {
        var img = await res.json()
    }

    return img
}