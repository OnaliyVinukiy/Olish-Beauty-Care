/*!
 * Olish Beauty Care & Cosmetics Official Website
 * Copyright (c) 2025 Olish Beauty Care & Cosmetics (Pvt) Ltd.
 * All rights reserved.
 *
 * Unauthorized copying, modification, or distribution of this code is prohibited.
 */

"use client";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";

export function Navigationbar({
  onLoginClick,
  user,
  onLogout,
}: {
  onLoginClick: () => void;
  user: { name: string; email: string; avatar: string } | null;
  onLogout: () => void;
}) {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand className="md:ml-24 h-6 sm:h-9">
        <img
          src="src/assets/logo.png"
          className="mr-3 h-6 sm:h-9"
          alt="Olish Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Olish Beauty Care
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 md:mr-24">
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={user.avatar} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.name}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={onLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button
            className="bg-cyan-800 hover:bg-cyan-700 text-white"
            onClick={onLoginClick}
          >
            Login
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" className="text-lg font-medium" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/serums" className="text-lg font-medium">
          Face Serums
        </Navbar.Link>
        <Navbar.Link href="/creams" className="text-lg font-medium">
          Face Creams
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg font-medium">
          About Us
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg font-medium">
          Contact Us
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
