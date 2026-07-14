import { useEffect, useRef, useState } from "react";
import logo from "../../img/logo.png";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Image,
    Modal,
    Row,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import { useFormStatus } from "react-dom";

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

export default function ProductsIndex({ products, categories, filters }) {
    const [productList, setProducts] = useState(products);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef(null);
    const categorySelectRef = useRef(null);
    const [editModalShow, setEditModalShow] = useState(false);
    const [productBeingEdited, setProductBeingEdited] = useState(null);

    function handleSearch() {
        setIsLoading(true);

        const searchParams = new URLSearchParams({
            name: searchRef.current.value,
            category: categorySelectRef.current.value,
        }).toString();

        const url = `${import.meta.env.VITE_APP_URL}/products?${searchParams}`;

        fetch(url, {
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
                const newUrl = `${window.location.pathname}?${searchParams}`;
                window.history.pushState({ path: newUrl }, "", newUrl);
            });
    }

    function openEditModal(product) {
        setProductBeingEdited(product);
        setEditModalShow(true);
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
                                            defaultValue={filters.name}
                                        />
                                        <Button
                                            variant="secondary"
                                            id="search-button"
                                            onClick={handleSearch}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span
                                                        role="status"
                                                        className="me-2"
                                                    >
                                                        Pesquisando...
                                                    </span>
                                                    <span
                                                        className="spinner-border spinner-border-sm"
                                                        aria-hidden="true"
                                                    ></span>
                                                </>
                                            ) : (
                                                <>
                                                    Pesquisar
                                                    <i className="bi bi-search ms-2"></i>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </Col>
                                <div className="col">
                                    <select
                                        id="category"
                                        className="form-select"
                                        ref={categorySelectRef}
                                        onChange={handleSearch}
                                        defaultValue={filters.category.toLowerCase()}
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
                            >
                                Adicionar...
                            </Button>
                        </div>
                    </Row>
                    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                        {productList.length > 0 ? (
                            productList.map((product) => (
                                <Product
                                    key={product.id}
                                    product={product}
                                    openEditModal={openEditModal}
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

            <EditModal
                product={productBeingEdited}
                categories={categories}
                show={editModalShow}
                setShow={setEditModalShow}
            />
        </>
    );
}

function Product({ product, openEditModal }) {
    return (
        <>
            <div key={product.id} className="col">
                <Card className="shadow-sm h-100">
                    <Card.Img
                        variant="top"
                        as="div"
                        className="border-bottom d-flex justify-content-center bg-body-tertiary"
                    >
                        <Image
                            className="p-4 w-50 mx-auto"
                            src={logo}
                            alt=""
                        ></Image>
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
                                        {currencyFormatter.format(
                                            product.price,
                                        )}
                                    </div>
                                    <div className="d-flex gap-2 fs-5 text-body-tertiary">
                                        <button
                                            className="icon-btn icon-btn-info"
                                            onClick={() =>
                                                openEditModal(product)
                                            }
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
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

function EditModal({ product, categories, show, setShow }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const availableCategories = getAvailableCategories();

    useEffect(() => {
        async function setCategories() {
            if (product) {
                setSelectedCategories([...product.categories]);
            }
        }
        setCategories();
    }, [product]);

    function getAvailableCategories() {
        const availableCategories = [];

        for (const category of categories) {
            if (
                !selectedCategories.some(
                    (selected) => selected.id === category.id,
                )
            ) {
                availableCategories.push(category);
            }
        }

        return availableCategories;
    }

    if (!product) {
        return null;
    }

    return (
        <Modal show={show} fullscreen="sm-down" onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form action="" method="POST">
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={product.name}
                            placeholder="Digite o nome..."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            inputMode="decimal"
                            defaultValue={product.price}
                            placeholder="Digite o preço..."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label>Quantidade em estoque</Form.Label>
                        <Form.Control
                            type="number"
                            step="1"
                            inputMode="number"
                            defaultValue={product.stock}
                            placeholder="Digite a quantidade..."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categorias</Form.Label>
                        <Typeahead
                            id="categories"
                            multiple
                            labelKey="name"
                            options={availableCategories}
                            onChange={setSelectedCategories}
                            defaultSelected={product.categories}
                            placeholder="Escolha as categorias..."
                            emptyLabel="Não há categorias disponíveis."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            defaultValue={product.description}
                            placeholder="Digite a descrição..."
                        />
                    </Form.Group>

                    <Button
                        className="text-white"
                        variant="primary"
                        type="submit"
                    >
                        Confirmar alterações
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
