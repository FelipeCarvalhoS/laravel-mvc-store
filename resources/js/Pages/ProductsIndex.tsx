import { useRef, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

import logo from "@/img/logo.png";
import { index } from "@/js/actions/App/Http/Controllers/ProductController";
import FormModal from "@/js/Pages/ProductsIndex/FormModal";
import ProductCard from "@/js/Pages/ProductsIndex/ProductCard";
import type { Product, ProductsIndexProps } from "@/js/types/products";
import { router } from "@inertiajs/react";

export default function ProductsIndex({
    products,
    categories,
    filters,
}: ProductsIndexProps) {
    const searchRef = useRef<HTMLInputElement | null>(null);
    const categorySelectRef = useRef<HTMLSelectElement | null>(null);
    const [formModalShow, setFormModalShow] = useState(false);
    const [productBeingEdited, setProductBeingEdited] =
        useState<Product | null>(null);

    function handleSearch() {
        const searchInput = searchRef.current;
        const categorySelect = categorySelectRef.current;

        if (!searchInput || !categorySelect) {
            return;
        }

        const newFilters = {
            name: searchInput.value,
            category: categorySelect.value,
        };

        const newUrl = index.url({ query: newFilters });

        router.get(
            newUrl,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ["products"],
            },
        );
    }

    function openFormModal(productToEdit?: Product) {
        setProductBeingEdited(productToEdit ?? null);
        setFormModalShow(true);
    }

    return (
        <>
            <main className="py-5 bg-body-secondary">
                <Container>
                    <h1 className="mb-4">Catálogo de Produtos</h1>
                    <Row className="gx-2 gy-3 mb-3">
                        <Col xs={12} md={10}>
                            <Row className="g-2">
                                <Col xs={7} sm={9}>
                                    <div className="input-group">
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Pesquisar por nome..."
                                            aria-label="Pesquisar por nome..."
                                            aria-describedby="search-button"
                                            ref={searchRef}
                                            defaultValue={filters.name ?? ""}
                                        />
                                        <Button
                                            variant="secondary"
                                            id="search-button"
                                            onClick={handleSearch}
                                        >
                                            Pesquisar
                                            <i className="bi bi-search ms-2"></i>
                                        </Button>
                                    </div>
                                </Col>
                                <div className="col">
                                    <select
                                        id="category"
                                        className="form-select"
                                        ref={categorySelectRef}
                                        onChange={handleSearch}
                                        defaultValue={
                                            filters.category?.toLowerCase() ??
                                            ""
                                        }
                                    >
                                        <option value="">Categoria</option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.name.toLowerCase()}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Row>
                        </Col>
                        <div className="col">
                            <Button
                                className="w-100 text-white"
                                variant="success"
                                onClick={() => openFormModal()}
                            >
                                Adicionar...
                            </Button>
                        </div>
                    </Row>
                    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onEdit={() => openFormModal(product)}
                                />
                            ))
                        ) : (
                            <div
                                className="p-5 mx-auto d-flex flex-column align-items-center gap-3"
                                style={{ width: "min(100%, 30rem)" }}
                            >
                                <Image src={logo} alt="" className="w-50" />
                                <h2 className="h4 text-center">
                                    Nenhum produto encontrado.
                                </h2>
                                <p className="text-center">
                                    Nenhum produto corresponde à pesquisa.
                                    Revise os filtros e tente novamente.
                                </p>
                            </div>
                        )}
                    </Row>
                </Container>
            </main>

            <FormModal
                product={productBeingEdited}
                categories={categories}
                show={formModalShow}
                setShow={setFormModalShow}
            />
        </>
    );
}
