import { useState } from "react"

const valP = { name: '', price: 0 }

function Create() {
    const [product, setProduct] = useState(valP)
    const handleChange = (e) => {
        const fieldValue = e.target.value;
        const fieldName = e.target.name;
        setProduct({ ...product, [fieldName]: fieldValue })

    }
    const handleClick = (e) => {
        e.preventDefault()
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/prod`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }).then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log("Producto creado con exito")
                    setProduct(valP)
                } else {
                    console.log(data.message)
                }
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <div>
                <h1>Crear nuevo producto</h1>
                <form>
                    <input type='text' name="name" value={product.name} onChange={handleChange} />
                    <input type='number' name="price" value={product.price} onChange={handleChange} />
                    <button onClick={handleClick}>Crear Producto</button>
                </form>
            </div>
            <style jsx>{
                `
                form{
                    display: flex;
                    flex-direction: column;
                    width: 20rem;
                    margin: 0 auto;
                }

                input{
                    margin-bottom: 0.5rem;
                }

                h1{
                    text-align: center;
                }
                ` }

            </style>
        </>
    )
}

export default Create