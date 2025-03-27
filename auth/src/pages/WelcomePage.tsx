import React, { FC, useContext, useEffect } from "react";
import './styles/normalize.css'
import './styles/WelcomePageStyles.css'
import about1Path from './images/about1.svg'
import about2Path from './images/about2.svg'
import about3Path from './images/about3.svg'
import bitcoinImagePath from './images/bitcoin-image.webp'
import bgForLogin from '../images/authBackground.jpg'
import { Typography } from "antd";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import LoginForm from "../components/LoginForm/LoginForm";



const WelcomePage: FC = () => {
    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem("token")) {
          store.checkAuth();
        }
    }, []);

    if (store.isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!store.isAuth) {
    return (
      <div style={{ background: `url(${bgForLogin}) center/cover no-repeat`, width: '100vw', height: '100vh' }}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <LoginForm />
        </div>
      </div>
    );
    }

    return (
        <div>
        <header className="header container">
            <p className="logo">Cryptan</p>
            <nav className="header__navigation">
                <ul className="header__navigation-list">
                    <li className="header__navigation-item">
                        <p className="header__navigation-link header__navigation-link--acc">{store.user.email}</p>
                    </li>
                    <li className="header__navigation-item">
                        <a href="/" className="header__navigation-link">Главная</a>
                    </li>
                    <li className="header__navigation-item">
                        <a href="#footer" className="header__navigation-link">Контакты</a>
                    </li>
                    <li className="header__navigation-item">
                        <a className="header__navigation-link" onClick={() => {store.logout()}} >Выйти</a>
                    </li>
                </ul>
            </nav>
        </header>

        <main className="main">
            <section className="welcome">
                <h1 className="welcome__title">Добро пожаловать в крипту</h1>
                <div className="welcome__body">
                    { store.user.isActivated
                        ? <div className="welcome__body-message-container">
                            <a className="welcome__body-sign-link button">Старт</a>
                            <a className="welcome__body-learn-link button transparent" href="#about">О проекте</a>
                        </div>
                        : <div className="welcome__body-message-container welcome__body-message-container--vertical">
                            <p className="welcome__body-no-activated-user-message">Подтвердите аккаунт, чтобы пользоваться приложением</p>
                            <a className="welcome__body-learn-link button transparent" href="#about">О проекте</a>
                        </div>
                    }
                    
                    
                </div>
            </section>
            
            <section id="about" className="about container">
                <div className="about__header">
                    <h2 className="about__header-title  title-standard">О проекте</h2>
                    <p className="about__header-subtitle subtitle-standard">Че мы делаем?</p>
                </div>
                <div className="about__body">
                    <ul className="about__list">
                        <li className="about__item">
                            <img src={about1Path}
                                alt="graphic design" 
                                className="about__item-image"
                                loading="lazy"
                            />
                            <h3 className="about__item-title item-title">Ну чето там</h3>
                            <p className="about__item-subtitle item-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
                        </li>
                        <li className="about__item">
                            <img src={about2Path}
                                alt="graphic design" 
                                className="about__item-image"
                                loading="lazy"
                            />
                            <h3 className="about__item-title item-title">Сям</h3>
                            <p className="about__item-subtitle item-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
                        </li>
                        <li className="about__item">
                            <img src={about3Path}
                                alt="graphic design" 
                                className="about__item-image"
                                loading="lazy"
                            />
                            <h3 className="about__item-title item-title">Туда сюда</h3>
                            <p className="about__item-subtitle item-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="services">
                <div className="services__header container">
                    <h2 className="services__header-title  title-standard">Другие продукты</h2>
                    <p className="services__header-subtitle subtitle-standard">Зацените</p>
                </div>
                <div className="services__body container">
                    <ul className="services__list">
                        <li className="services__item">
                            <img 
                                src={bitcoinImagePath}
                                alt="service 1" 
                                className="sercives__item-image"
                                width="430" height="287" loading="lazy"
                            />
                            <h3 className="services__item-title item-title">Автоскальпинг битка</h3>
                            <p className="services__item-subtitle item-subtitle">Мощная закупка биткоина на 80т. долларах и автоматическая продажа на 20т.</p>
                            <a className="services__body-learn-link button transparent">Подробнее</a>
                        </li>
                        <li className="services__item">
                            <img 
                                src={bitcoinImagePath}
                                alt="service 1" 
                                className="sercives__item-image"
                                width="430" height="287" loading="lazy"
                            />
                            <h3 className="services__item-title item-title">Генератор мутных темок</h3>
                            <p className="services__item-subtitle item-subtitle">Для тех, кто слушает макана, занимается P2P и прочей шляпой</p>
                            <a className="services__body-learn-link button transparent">Подробнее</a>
                        </li>
                    </ul>
                </div>
            </section>
        </main>

        <footer className="footer" id="footer">
            <div className="footer__body container">
                <div className="footer__column">
                    <h4 className="footer__about-title footer-title">О Negative Technologies</h4>
                    <p className="footer__about-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
                </div>
                <div className="footer__column">
                    <h4 className="footer__links-title footer-title">Полезные ссылки</h4>
                    <ul className="footer__links-list">
                        <li className="footer__link-item">
                            <p>Phasellus gravida semper nisi</p>
                        </li>
                        <li className="footer__link-item">
                            <p>Suspendisse nisl elit</p>
                        </li>
                        <li className="footer__link-item">
                            <p>Dellentesque habitant morbi</p>
                        </li>
                        <li className="footer__link-item">
                            <p>Etiam sollicitudin ipsum</p>
                        </li>
                    </ul>
                </div>
                <div className="footer__column">
                    <div className="footer__soc1als-title footer-title">Мы в социальных сетях</div>
                    <ul className="footer__soc1als-list">
                        <li className="footer__soc1als-item">
                            <svg viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.4667 4.39996C17.4667 4.53329 17.4667 4.73329 17.4667 4.86663C17.4667 9.86663 13.6667 15.6 6.73334 15.6C4.6 15.6 2.6 15 0.933334 13.9333C1.2 13.9333 1.53333 14 1.86667 14C3.66667 14 5.26667 13.4 6.53333 12.4C4.86667 12.4 3.46667 11.2666 3 9.79996C3.2 9.86663 3.46667 9.86663 3.73333 9.86663C4.06667 9.86663 4.4 9.79996 4.73333 9.73329C3 9.33329 1.66667 7.79996 1.66667 5.99996C1.66667 5.99996 1.66667 5.99996 1.66667 5.93329C2.2 6.19996 2.73333 6.39996 3.4 6.39996C2.4 5.73329 1.73333 4.59996 1.73333 3.26663C1.73333 2.59996 1.93333 1.93329 2.26667 1.39996C4.13333 3.66663 6.93334 5.19996 10.0667 5.33329C10 5.06663 10 4.79996 10 4.46663C10 2.39996 11.6667 0.666626 13.8 0.666626C14.8667 0.666626 15.8667 1.13329 16.5333 1.86663C17.4 1.66663 18.2 1.39996 18.9333 0.933293C18.6667 1.79996 18.0667 2.53329 17.2667 2.99996C17.9333 2.93329 18.6667 2.73329 19.3333 2.46663C18.8 3.19996 18.2 3.86663 17.4667 4.39996Z" fill="black"/>
                            </svg>    
                            <p className="footer__soc1als-name">twitter</p>
                        </li>
                        <li className="footer__soc1als-item">
                            <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.3333 0.666626H2.33333C1.19999 0.666626 0.333328 1.53329 0.333328 2.66663V16.6666C0.333328 17.8 1.19999 18.6666 2.33333 18.6666H9.33333V11.6666H7.33333V9.19996H9.33333V7.13329C9.33333 4.99996 10.5333 3.46663 13.0667 3.46663H14.8667V6.06663H13.6667C12.6667 6.06663 12.2667 6.79996 12.2667 7.53329V9.19996H14.8667L14.3333 11.6666H12.3333V18.6666H16.3333C17.4667 18.6666 18.3333 17.8 18.3333 16.6666V2.66663C18.3333 1.53329 17.4667 0.666626 16.3333 0.666626Z" fill="black"/>
                            </svg>    
                            <p className="footer__soc1als-name">facebook</p>
                        </li>
                        <li className="footer__soc1als-item">
                            <svg viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.2667 5.8C14.7333 2.06666 11 0.199999 7.06667 0.666665C3.93334 0.999999 0.800004 3.53333 0.66667 7.13333C0.600004 9.33333 1.2 11 3.33334 11.4667C4.26667 9.86666 3.06667 9.53333 2.86667 8.33333C2.06667 3.53333 8.4 0.333332 11.6667 3.66666C13.9333 6 12.4667 13.0667 8.8 12.3333C5.26667 11.6 10.5333 6 7.73334 4.86666C5.46667 3.93333 4.26667 7.6 5.33334 9.46666C4.66667 12.6 3.33334 15.5333 3.86667 19.4667C5.66667 18.1333 6.26667 15.6667 6.73334 13.0667C7.6 13.6 8.13334 14.2 9.26667 14.2667C13.4667 14.6 15.8 10 15.2667 5.8Z" fill="black"/>
                            </svg>    
                            <p className="footer__soc1als-name">Pinterest</p>
                        </li>
                        <li className="footer__soc1als-item">
                            <svg viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.26666 4.73337C1.26666 6.20004 1.73333 7.33337 2.73333 7.93337C3.53333 8.46671 4.46666 8.53337 4.93333 8.53337C5.06666 8.53337 5.13333 8.53337 5.2 8.53337C5.2 8.53337 5.06666 9.53337 5.8 10.5334H5.73333C4.46666 10.5334 0.266663 10.8 0.266663 14.2667C0.266663 17.8 4.13333 17.9334 4.93333 17.9334C5 17.9334 5 17.9334 5 17.9334C5 17.9334 5.06666 17.9334 5.13333 17.9334C5.6 17.9334 6.93333 17.8667 8.13333 17.2667C9.66666 16.5334 10.4667 15.2 10.4667 13.4C10.4667 11.6667 9.26666 10.6 8.4 9.80004C7.86666 9.33337 7.4 8.93337 7.4 8.53337C7.4 8.13337 7.73333 7.80004 8.13333 7.46671C8.8 6.86671 9.46666 6.00004 9.46666 4.33337C9.46666 2.86671 9.26666 1.86671 8.13333 1.26671C8.33333 1.20004 8.8 1.13337 9 1.13337C9.6 1.06671 10.5333 0.933374 10.5333 0.466707V0.333374H5.93333C5.86666 0.333374 1.26666 0.533374 1.26666 4.73337ZM8.73333 13.7334C8.8 15.1334 7.6 16.2 5.8 16.3334C3.93333 16.4667 2.46666 15.6667 2.4 14.2667C2.33333 13.6 2.66666 12.9334 3.26666 12.4C3.86666 11.8667 4.66666 11.5334 5.53333 11.4667C5.66666 11.4667 5.73333 11.4667 5.86666 11.4667C7.46666 11.4 8.6 12.4 8.73333 13.7334ZM7.53333 3.73337C8 5.33337 7.33333 7.00004 6.2 7.26671C6.06666 7.33337 5.93333 7.33337 5.8 7.33337C4.8 7.33337 3.8 6.33337 3.46666 4.93337C3.26666 4.20004 3.26666 3.53337 3.53333 2.86671C3.73333 2.20004 4.2 1.80004 4.66666 1.66671C4.8 1.60004 4.93333 1.60004 5.06666 1.60004C6.26666 1.60004 7 2.06671 7.53333 3.73337ZM15.2667 7.13337V4.13337H13.2667V7.13337H10.2667V9.13337H13.2667V12.1334H15.2667V9.13337H18.2667V7.13337H15.2667Z" fill="black"/>
                            </svg>   
                            <p className="footer__soc1als-name">Google</p>
                        </li>
                        <li className="footer__soc1als-item">
                            <svg viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.6 4.60003C13.6 4.60003 12.1333 9.2667 12 9.60003C11.9333 9.20003 10.8667 0.866699 10.8667 0.866699C8.33333 0.866699 7 2.6667 6.26666 4.53337C6.26666 4.53337 4.46667 9.20003 4.33333 9.60003C4.33333 9.2667 4.06667 4.60003 4.06667 4.60003C3.93333 2.2667 1.8 0.866699 0.0666656 0.866699L2.13333 13.4667C4.8 13.4667 6.2 11.6667 6.93333 9.80003C6.93333 9.80003 8.53333 5.6667 8.6 5.53337C8.6 5.73337 9.73333 13.5334 9.73333 13.5334C12.4 13.5334 13.8 11.8667 14.6 10L18.3333 0.866699C15.7333 0.866699 14.3333 2.6667 13.6 4.60003Z" fill="black"/>
                            </svg>    
                            <p className="footer__soc1als-name">Webflow</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer__extra">
                <p className="footer__copyright">Copyright Negative Technologies Inc.</p>
            </div>
        </footer>
    </div>
  );
};

export default observer(WelcomePage);
