export default async function ( {prompt, negativePrompt, seed} ) {

    const data= {
        "prompt":  'photo of alexensual man ' + prompt,
        'negative_prompt' : negativePrompt,
        "steps": 40,
        "sampler_index": "Euler a",
        'seed': seed
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

    //return 'asdf'
    return img
}