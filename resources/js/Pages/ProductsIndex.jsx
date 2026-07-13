import { useRef, useState } from "react";
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
    const [editModalShow, setEditModalShow] = useState(false);
    const [productBeingEdited, setProductBeingEdited] = useState(null);

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

function EditModal({ product, show, setShow }) {
    if (!product) {
        return null;
    }
    return (
        <Modal show={show} fullscreen="sm-down" onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
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
                            inputmode="decimal"
                            defaultValue={product.price}
                            placeholder="Digite o preço..."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label>Quantidade em estoque</Form.Label>
                        <Form.Control
                            type="number"
                            step="1"
                            inputmode="number"
                            defaultValue={product.stock}
                            placeholder="Digite a quantidade..."
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

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
