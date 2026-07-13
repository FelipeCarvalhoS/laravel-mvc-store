import React from "react";
export function Product({ logo, limitText, category }) {
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
