import React, { useState } from "react";
import { Button, Modal, Label, TextInput, FileInput } from "flowbite-react";
import axios from "axios";

interface AddFeaturedProps {
  openModal: boolean;
  onCloseModal: () => void;
  onProductAdded: () => void;
}

const AddFeatured: React.FC<AddFeaturedProps> = ({
  openModal,
  onCloseModal,
  onProductAdded,
}) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImage2, setProductImage2] = useState<File | null>(null);
  const [productImage3, setProductImage3] = useState<File | null>(null);

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    if (productImage) formData.append("productImage", productImage);
    if (productImage2) formData.append("productImage2", productImage2);
    if (productImage3) formData.append("productImage3", productImage3);

    try {
      await axios.post(
        "http://localhost:5000/api/products/featured",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onProductAdded();
      onCloseModal();
      alert("Featured product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <Modal show={openModal} onClose={onCloseModal}>
      <Modal.Header>Add Featured Product</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <TextInput
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="productDescription">Product Description</Label>
            <TextInput
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="productPrice">Product Price</Label>
            <TextInput
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="productImage">Product Image</Label>
            <FileInput
              id="productImage"
              onChange={(e) => setProductImage(e.target.files?.[0] ?? null)}
              required
            />
          </div>

          <div>
            <Label htmlFor="productImage2">Product Image 2 (Optional)</Label>
            <FileInput
              id="productImage2"
              onChange={(e) => setProductImage2(e.target.files?.[0] ?? null)}
            />
          </div>

          <div>
            <Label htmlFor="productImage3">Product Image 3 (Optional)</Label>
            <FileInput
              id="productImage3"
              onChange={(e) => setProductImage3(e.target.files?.[0] ?? null)}
            />
          </div>

          <Button onClick={handleAddProduct}>Save Product</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddFeatured;
