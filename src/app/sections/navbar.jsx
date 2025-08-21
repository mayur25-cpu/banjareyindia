"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Events", href: "/events" },
  { label: "Trekkings", href: "/trekkings" },
  { label: "Heritage Walks", href: "/heritage-walks" },
  { label: "Guidance", href: "/guidance" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.5s ease",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          px: { xs: 2, sm: 4 },
          py: scrolled ? 0.5 : 1,
        }}
      >
        <Toolbar
          sx={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: scrolled ? 70 : 100,
            position: "relative",
            transition: "all 0.4s ease",
          }}
        >
          {/* Mobile Menu */}
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              color: scrolled ? "#232323" : "#fff",
              display: { xs: "inline-flex", md: "none" },
              fontSize: 32,
              zIndex: 1400,
              transition: "color 0.4s ease",
            }}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>

          {/* Logo + Branding */}
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textDecoration: "none",
              userSelect: "none",
            }}
          >
            <Image
              src="/banjareyindia/logo.png"
              alt="Banjarey Logo"
              width={100}
              height={80}
              style={{
                borderRadius: 20,
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                marginBottom: 6,
                transition: "all 0.4s ease",
                transform: scrolled ? "scale(0.7)" : "scale(1)",
              }}
              priority
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: scrolled ? "#232323" : "#fff",
                letterSpacing: 2,
                textTransform: "uppercase",
                lineHeight: 1.2,
                transition: "all 0.4s ease",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                transform: scrolled ? "scale(0.85)" : "scale(1)",
                "&:hover": {
                  transform: scrolled
                    ? "scale(0.87) translateY(-2px)"
                    : "scale(1.02) translateY(-2px)",
                  textShadow: "3px 3px 6px rgba(0,0,0,0.7)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              Banjarey India
            </Typography>
          </Link>

          {/* Desktop Nav */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 4,
              mt: 3,
              flexWrap: "wrap",
              width: "100%",
              transform: scrolled ? "scale(0.9)" : "scale(1)",
              transition: "all 0.4s ease",
            }}
          >
            {navLinks.map(({ label, href }) => (
              <Button
                key={href}
                component={Link}
                href={href}
                sx={{
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: scrolled ? "#232323" : "#fff",
                  textTransform: "none",
                  position: "relative",
                  transition: "all 0.3s ease",
                  textShadow: "0 0 0 rgba(0,0,0,0)",
                  "&:hover": {
                    color: "#F7971E",
                    backgroundColor: "transparent",
                    textShadow:
                      "1px 1px 0 rgba(0,0,0,0.3), 2px 2px 2px rgba(0,0,0,0.2)",
                    transform: "translateY(-2px)",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -3,
                    width: "0%",
                    height: "2px",
                    bgcolor: "#F7971E",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {label}
              </Button>
            ))}
            <Button
              href="/join"
              variant="contained"
              sx={{
                background: "linear-gradient(45deg,#F7971E,#d35400)",
                color: "#fff",
                fontWeight: 700,
                ml: 4,
                px: 3,
                py: 1.25,
                borderRadius: 3,
                textTransform: "uppercase",
                boxShadow: "0 6px 20px rgba(247,151,30,0.25)",
                transition: "all 0.4s ease",
                "&:hover": {
                  background: "linear-gradient(45deg,#232323,#000)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                },
              }}
            >
              Join Us
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: "85vw", maxWidth: 320, bgcolor: "#FFFDF7" },
        }}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #F7971E",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: scrolled ? "scale(0.85)" : "scale(1)", // mobile logo shrink
              transition: "all 0.4s ease",
            }}
          >
            <Image
              src="/banjareyindia/logo.png"
              alt="Banjarey Logo"
              width={80}
              height={60}
              style={{
                borderRadius: 16,
                marginBottom: 4,
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              }}
            />
            <Typography
              sx={{
                fontWeight: 800,
                letterSpacing: 2,
                fontSize: "1.2rem",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Banjarey India
            </Typography>
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {navLinks.map(({ label, href }) => (
            <ListItem
              key={href}
              disablePadding
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemButton
                component={Link}
                href={href}
                sx={{
                  textShadow: "0 0 0 rgba(0,0,0,0)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    textShadow:
                      "1px 1px 0 rgba(0,0,0,0.3), 2px 2px 2px rgba(0,0,0,0.2)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: "#232323",
                    fontSize: "1.1rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/join">
              <Button
                fullWidth
                sx={{
                  background: "linear-gradient(45deg,#F7971E,#d35400)",
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: 2,
                  py: 1.3,
                  mt: 2,
                  textTransform: "uppercase",
                  fontSize: "1.1rem",
                  "&:hover": {
                    background: "linear-gradient(45deg,#232323,#000)",
                  },
                }}
              >
                Join Us
              </Button>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
