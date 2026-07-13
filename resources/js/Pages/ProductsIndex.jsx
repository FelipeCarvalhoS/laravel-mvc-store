import { useRef, useState } from "react";
import logo from "../../img/logo.png";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

function limitText(text, limit = 100) {
    if (text.length <= limit) {
        return text;
    }

    const truncatedText = text.slice(0, limit);
    const lastWordBoundary = truncatedText.lastIndexOf(" ");

    return `${truncatedText.slice(0, lastWordBoundary)}...`;
}

export default function ProductsIndex({ products, categories }) {
    const [productList, setProducts] = useState(products);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef(null);

    function handleSearch(event) {
        setIsLoading(true);

        const searchParams = new URLSearchParams({
            name: searchRef.current.value,
        }).toString();
        const url = `${import.meta.env.VITE_APP_URL}/api/products?${searchParams}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            });
    }

    return (
        <main className="py-5 bg-body-secondary">
            <div className="container">
                <h1 className="mb-4">Catálogo de Produtos</h1>
                <div className="row gx-2 gy-3 mb-3">
                    <div className="col-12 col-md-10">
                        <div className="row g-2">
                            <div className="col-7 col-sm-9">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Pesquisar por nome..."
                                        aria-label="Pesquisar por nome..."
                                        aria-describedby="search-button"
                                        ref={searchRef}
                                    />
                                    <button
                                        className="btn btn-secondary"
                                        type="button"
                                        id="search-button"
                                        onClick={handleSearch}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span
                                                    role="status"
                                                    class="me-2"
                                                >
                                                    Pesquisando...
                                                </span>
                                                <span
                                                    class="spinner-border spinner-border-sm"
                                                    aria-hidden="true"
                                                ></span>
                                            </>
                                        ) : (
                                            <>
                                                Pesquisar
                                                <i className="bi bi-search ms-2"></i>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="col">
                                <select
                                    id="category"
                                    className="form-select"
                                    defaultValue=""
                                >
                                    <option value="">Categoria</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <button className="w-100 btn btn-success text-white">
                            Adicionar...
                        </button>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    {productList.length > 0 ? (
                        productList.map((product) => (
                            <Product key={product.id} product={product} />
                        ))
                    ) : (
                        <div
                            className="p-5 mx-auto d-flex flex-column align-items-center gap-3"
                            style={{ width: "min(100%, 30rem)" }}
                        >
                            <img src={logo} alt="" className="w-50" />
                            <h2 className="h4 text-center">
                                Nenhum produto encontrado.
                            </h2>
                            <p className="text-center">
                                Nenhum produto corresponde à pesquisa. Revise os
                                filtros e tente novamente.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function Product({ product }) {
    return (
        <div key={product.id} className="col">
            <div className="card shadow-sm h-100">
                <div className="border-bottom d-flex justify-content-center bg-body-tertiary">
                    <img className="p-4 w-50 mx-auto" src={logo} alt="" />
                </div>
                <div className="card-body d-flex flex-column justify-content-between gap-3">
                    <div>
                        <h2 className="card-text font-base fs-6 fw-normal mb-1">
                            {product.name}
                        </h2>
                        <div>
                            <small className="text-body-secondary">
                                {limitText(product.description)}
                            </small>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        <div className="hstack gap-2 flex-wrap">
                            {product.categories.map((category) => (
                                <span
                                    key={category.id}
                                    className="badge rounded-pill bg-primary text-white"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                        <div>
                            <div className="mb-1">
                                <small>Quantidade: {product.stock}</small>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="h5">
                                    {currencyFormatter.format(product.price)}
                                </div>
                                <div className="d-flex gap-2 fs-5 text-body-tertiary">
                                    <button
                                        className="icon-btn icon-btn-info"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEdit"
                                        data-bs-name={product.name}
                                        data-bs-price={product.price}
                                        data-bs-stock={product.stock}
                                        data-bs-description={
                                            product.description
                                        }
                                    >
                                        <span className="visually-hidden">
                                            Editar
                                        </span>
                                        <i className="bi bi-pencil" />
                                    </button>
                                    <button className="icon-btn icon-btn-danger">
                                        <span className="visually-hidden">
                                            Deletar
                                        </span>
                                        <i className="bi bi-trash" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
