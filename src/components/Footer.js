import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isGenreOpen, setIsGenreOpen] = useState(false);
    const [isBantuanOpen, setIsBantuanOpen] = useState(false);


    const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768);
    };


    useEffect(() => {
        window.addEventListener("resize", checkScreenSize);
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    const toggleGenre = () => {
        if (isMobile) setIsGenreOpen(!isGenreOpen);
    };

    const toggleBantuan = () => {
        if (isMobile) setIsBantuanOpen(!isBantuanOpen);
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <img src="/img/logochill.png" alt="Logo" />
                    <p>©2023 Chill All Rights Reserved.</p>
                </div>
                <div className="footer-links">
                    <div className="footer-column">
                        <h3 onClick={toggleGenre} className={isMobile ? "footer-toggle" : ""}>
                            Genre
                        </h3>
                        <ul className={isMobile && !isGenreOpen ? "closed" : "open"}>
                            <li>Aksi</li>
                            <li>Anak-anak</li>
                            <li>Anime</li>
                            <li>Britania</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <ul className={isMobile && !isGenreOpen ? "closed" : "open"}>
                            <li>Drama</li>
                            <li>Fantasi Ilmiah & Fantasi</li>
                            <li>Kejahatan</li>
                            <li>KDrama</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <ul className={isMobile && !isGenreOpen ? "closed" : "open"}>
                            <li>Komedi</li>
                            <li>Petualangan</li>
                            <li>Perang</li>
                            <li>Romantis</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <ul className={isMobile && !isGenreOpen ? "closed" : "open"}>
                            <li>Sains & Alam</li>
                            <li>Thriller</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3 onClick={toggleBantuan} className={isMobile ? "footer-toggle" : ""}>
                            Bantuan
                        </h3>
                        <ul className={isMobile && !isBantuanOpen ? "closed" : "open"}>
                            <li>FAQ</li>
                            <li>Kontak Kami</li>
                            <li>Privasi</li>
                            <li>Syarat & Ketentuan</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

