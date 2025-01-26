/*!
 * Olish Beauty Care & Cosmetics Official Website
 * Copyright (c) 2025 Olish Beauty Care & Cosmetics (Pvt) Ltd.
 * All rights reserved.
 *
 * Unauthorized copying, modification, or distribution of this code is prohibited.
 */
import React, { useState } from "react";
import { Button, Table } from "flowbite-react";
import AddFeatured from "./components/AddFeatured";

interface Order {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  status: string;
}
const handleProductAdded = () => {
  console.log("Product successfully added!");
};

const Dashboard: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const [orderList, setOrderList] = useState<Order[]>([
    {
      id: "1",
      customerName: "John Doe",
      productName: "Face Cream",
      quantity: 2,
      status: "Pending",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      productName: "Serum",
      quantity: 1,
      status: "Shipped",
    },
  ]);

  return (
    <div className="p-4">
      <h1 className="mt-8 text-2xl text-center font-semibold text-gray-900">
        Dashboard
      </h1>

      <div className="mt-12 flex space-x-4">
        <Button onClick={() => setOpenModal(true)} color="blue">
          Add Featured Product
        </Button>
        <Button className="bg-pink-700">Add Face Serum</Button>
        <Button className="bg-purple-700">Add Face Cream</Button>
        <Button className="bg-orange-700">Add Other Products</Button>
      </div>
      <AddFeatured
        openModal={openModal}
        onCloseModal={() => setOpenModal(false)}
        onProductAdded={handleProductAdded}
      />

      <div className="mt-6 overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Customer Name</Table.HeadCell>
            <Table.HeadCell>Product</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {orderList.map((order) => (
              <Table.Row key={order.id}>
                <Table.Cell>{order.id}</Table.Cell>
                <Table.Cell>{order.customerName}</Table.Cell>
                <Table.Cell>{order.productName}</Table.Cell>
                <Table.Cell>{order.quantity}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
