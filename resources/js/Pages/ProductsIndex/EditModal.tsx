import { useRef, useState } from "react";

import { Form as InertiaForm, useForm } from "@inertiajs/react";
import { Button, Form, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

import { update } from "@/js/actions/App/Http/Controllers/ProductController";
import type { Product, ProductCategory } from "@/js/types/products";
import { Option } from "react-bootstrap-typeahead/types/types";

type EditModalProps = {
    product: Product;
    categories: ProductCategory[];
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditModal({
    product,
    categories,
    show,
    setShow,
}: EditModalProps) {
    const [submissionWasRejected, setSubmissionWasRejected] = useState(false);

    const selectedCategories = useRef<number[]>([
        ...(product.categories.map((c) => c.id) || []),
    ]);

    const availableCategories = categories.filter(
        (category) =>
            !product.categories.some((selected) => selected.id === category.id),
    );

    function handleSelectedCategoriesChange(selected: Option[]) {
        const newCategories = selected as ProductCategory[];
        const categoryIds = newCategories.map((category) => category.id);
        selectedCategories.current = categoryIds;
    }

    function handleClose() {
        setSubmissionWasRejected(false);
        setShow(false);
    }

    return (
        <Modal show={show} fullscreen="sm-down" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InertiaForm
                    noValidate
                    action={update(product.id)}
                    transform={(data) => ({
                        ...data,
                        categories: selectedCategories.current,
                    })}
                    onSuccess={handleClose}
                    onError={() => setSubmissionWasRejected(true)}
                    disableWhileProcessing
                >
                    {({ processing, errors }) => (
                        <>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    name="name"
                                    isValid={
                                        submissionWasRejected && !errors.name
                                    }
                                    isInvalid={!!errors.name}
                                    type="text"
                                    defaultValue={product.name}
                                    placeholder="Digite o nome..."
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório. O valor deve ter no
                                    máximo 100 caracteres.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    name="price"
                                    isValid={
                                        submissionWasRejected && !errors.price
                                    }
                                    isInvalid={!!errors.price}
                                    type="number"
                                    step="0.01"
                                    inputMode="decimal"
                                    defaultValue={product.price}
                                    placeholder="Digite o preço..."
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório. O valor deve ser um
                                    número entre 0 e 999.999,99, com até duas
                                    casas decimais.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="stock">
                                <Form.Label>Quantidade em estoque</Form.Label>
                                <Form.Control
                                    name="stock"
                                    isValid={
                                        submissionWasRejected && !errors.stock
                                    }
                                    isInvalid={!!errors.stock}
                                    type="number"
                                    step="1"
                                    inputMode="numeric"
                                    defaultValue={product.stock}
                                    placeholder="Digite a quantidade..."
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório. O valor deve ser um
                                    número inteiro entre 0 e 65535.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="categories">
                                <Form.Label>Categorias</Form.Label>
                                <Typeahead
                                    multiple
                                    isValid={
                                        submissionWasRejected &&
                                        !errors.categories
                                    }
                                    isInvalid={!!errors.categories}
                                    labelKey="name"
                                    options={availableCategories}
                                    defaultSelected={product.categories}
                                    onChange={handleSelectedCategoriesChange}
                                    placeholder="Escolha as categorias..."
                                    emptyLabel="Não há categorias disponíveis."
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="description"
                            >
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    name="description"
                                    isValid={
                                        submissionWasRejected &&
                                        !errors.description
                                    }
                                    isInvalid={!!errors.description}
                                    as="textarea"
                                    defaultValue={product.description}
                                    placeholder="Digite a descrição..."
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório. O valor deve ter no
                                    máximo 255 caracteres.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button
                                className="text-white"
                                variant="primary"
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        Processando...
                                        <span
                                            className="spinner-border spinner-border-sm ms-2"
                                            aria-hidden="true"
                                        ></span>
                                    </>
                                ) : (
                                    "Confirmar alterações"
                                )}
                            </Button>
                        </>
                    )}
                </InertiaForm>
            </Modal.Body>
        </Modal>
    );
}
