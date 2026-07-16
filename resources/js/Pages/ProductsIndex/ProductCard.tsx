import { Card, Image } from "react-bootstrap";

import logo from "@/img/logo.png";

import type { Product } from "@/js/types";
import { currencyFormatter, limitText } from "@/js/utils";
import { destroy } from "@/js/routes/products";
import { Link } from "@inertiajs/react";

type ProductCardProps = {
    product: Product;
    onEdit: (product: Product) => void;
};

export default function ProductCard({ product, onEdit }: ProductCardProps) {
    return (
        <div className="col">
            <Card className="shadow-sm h-100">
                <Card.Img
                    variant="top"
                    as="div"
                    className="border-bottom d-flex justify-content-center bg-body-tertiary"
                >
                    <Image className="p-4 w-50 mx-auto" src={logo} alt="" />
                </Card.Img>
                <Card.Body className="d-flex flex-column justify-content-between gap-3">
                    <div>
                        <Card.Text
                            as="h2"
                            className="font-base fs-6 fw-normal mb-1"
                        >
                            {product.name}
                        </Card.Text>
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
                                        onClick={() => onEdit(product)}
                                    >
                                        <span className="visually-hidden">
                                            Editar
                                        </span>
                                        <i className="bi bi-pencil" />
                                    </button>
                                    <Link
                                        className="icon-btn icon-btn-danger"
                                        href={destroy(product.id)}
                                        method="delete"
                                        as="button"
                                        preserveScroll
                                        only={["products"]}
                                    >
                                        <span className="visually-hidden">
                                            Deletar
                                        </span>
                                        <i className="bi bi-trash" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
