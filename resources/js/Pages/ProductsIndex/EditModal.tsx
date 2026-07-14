import { useEffect, useState } from "react";

import { Form as InertiaForm } from "@inertiajs/react";
import { Button, Form, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

import { update } from "@/js/actions/App/Http/Controllers/ProductController";
import type { Product, ProductCategory } from "@/js/types/products";

type EditModalProps = {
    product: Product | null;
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
    const [selectedCategories, setSelectedCategories] = useState<
        ProductCategory[]
    >([]);

    useEffect(() => {
        if (product) {
            setSelectedCategories([...product.categories]);
            return;
        }

        setSelectedCategories([]);
    }, [product]);

    if (!product) {
        return null;
    }

    const availableCategories = categories.filter(
        (category) =>
            !selectedCategories.some((selected) => selected.id === category.id),
    );

    return (
        <Modal show={show} fullscreen="sm-down" onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InertiaForm action={update(product.id)}>
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
                            inputMode="numeric"
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
                            onChange={(selected) =>
                                setSelectedCategories(
                                    selected as ProductCategory[],
                                )
                            }
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
                </InertiaForm>
            </Modal.Body>
        </Modal>
    );
}
