import React from "react";
import { Col, Row } from "antd";

import "./QuienesSomos.css";

function QuienesSomos() {
  return (
    <Row className="Quienes">
      <div className="Quienes__container">
        <Row className="Quienes__container-desc">
          <Col lg={12} sm={24} xs={24} className="container__desc-text">
            <h1>¿Quienes somos?</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur facere maiores nobis atque quibusdam repudiandae ipsam
              labore? Animi itaque, impedit quod eaque ullam obcaecati qui.
              Doloremque aspernatur distinctio iure nulla. Voluptas eius numquam
              doloribus dolore quia explicabo doloremque voluptate vitae placeat
              soluta laboriosam officiis debitis excepturi aperiam eos impedit
              et asperiores, veritatis aut fuga quaerat odio ullam odit
              pariatur! Officiis. Sunt quae error voluptas libero deleniti
              quibusdam, quisquam quam odio, architecto laboriosam officiis! Et
              molestiae delectus quam qui omnis, officiis modi facilis velit,
              iste eum vel! Dolor aspernatur veniam iusto! Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Aspernatur facere maiores
              nobis atque quibusdam repudiandae ipsam labore? Animi itaque,
              impedit quod eaque ullam obcaecati qui. Doloremque aspernatur
              distinctio iure nulla. Voluptas eius numquam doloribus dolore quia
              explicabo doloremque voluptate vitae placeat soluta laboriosam
              officiis debitis excepturi aperiam eos impedit et asperiores,
              veritatis aut fuga quaerat odio ullam odit pariatur! Officiis.
              Sunt quae error voluptas libero deleniti quibusdam, quisquam quam
              odio, architecto laboriosam officiis! Et molestiae delectus quam
              qui omnis, officiis modi facilis velit, iste eum vel! Dolor
              aspernatur veniam iusto!
            </p>
          </Col>
          <Col lg={12} sm={24} xs={24} className="container__desc-img">
            <img
              src="https://fakeimg.pl/700x400/282828/eae0d0/"
              alt="fake img"
            />
          </Col>
        </Row>
        <Row className="Quienes__container-objetives">
          <Col className="container--objetives-text">
            <h2>Nuestros objetivos</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Repellendus eaque expedita iusto cupiditate laboriosam, beatae,
              magni dignissimos incidunt sapiente reiciendis reprehenderit ex
              molestiae repudiandae fuga recusandae necessitatibus tempora quas!
              Maiores! Fugit esse iusto, assumenda voluptas aspernatur
              repellendus iste minima animi, quidem veritatis in aperiam nostrum
              est natus fuga ea ad odit ducimus expedita labore voluptatum
              deleniti? Dolorem voluptates quis possimus? Praesentium
              perspiciatis minus repudiandae error doloremque dolore, numquam
              nisi hic quos quia cum deleniti incidunt accusantium esse laborum.
              Nemo aspernatur hic labore perspiciatis omnis commodi accusantium
              officia ducimus, veniam voluptas! Facere deserunt officiis,
              commodi quisquam distinctio nulla optio consequatur ipsum,
              voluptatum nostrum aliquam ab, neque modi nam adipisci impedit!
              Repellat, dolorum quod quam hic optio debitis cupiditate rem
              incidunt ullam.
            </p>
          </Col>
        </Row>
        <div className="Quienes__container-strategy">
          <h2>Estrategias</h2>
          <Row className="strategy__container">
            <Col xs={8} className="strategy__container-text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                aspernatur vitae? Rem, non libero eos accusantium deserunt sed.
                Officia repellendus placeat sunt eveniet corporis provident
                inventore voluptatibus dolores temporibus obcaecati.
              </p>
            </Col>
            <Col xs={8} className="strategy__container-text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                aspernatur vitae? Rem, non libero eos accusantium deserunt sed.
                Officia repellendus placeat sunt eveniet corporis provident
                inventore voluptatibus dolores temporibus obcaecati.
              </p>
            </Col>
            <Col xs={8} className="strategy__container-text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                aspernatur vitae? Rem, non libero eos accusantium deserunt sed.
                Officia repellendus placeat sunt eveniet corporis provident
                inventore voluptatibus dolores temporibus obcaecati.
              </p>
            </Col>
          </Row>
        </div>
        <div className="Quienes__container-adviser">
          <h2>Nuestros asesores</h2>
          <Row className="adviser__container">
            <Col
              lg={11}
              md={24}
              sm={24}
              xs={24}
              className="adviser__container-badge"
            >
              <div>
                <div className="adviser__badge-img">
                  <img
                    src="https://fakeimg.pl/150x150/282828/eae0d0/"
                    alt="fake img"
                  />
                </div>
                <div className="adviser__badge-text">
                  <div className="badge__text-name">Nombre del Asesor</div>
                  <div className="badge__text-jobTitle">
                    Dedicación del Asesor
                  </div>
                  <div className="badge__text-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil, aspernatur vitae? Rem, non libero eos accusantium
                    deserunt sed. Officia repellendus placeat sunt eveniet
                    corporis provident inventore voluptatibus dolores temporibus
                    obcaecati.
                  </div>
                </div>
              </div>
            </Col>
            <Col
              lg={11}
              md={24}
              sm={24}
              xs={24}
              className="adviser__container-badge"
            >
              <div>
                <div className="adviser__badge-img">
                  <img
                    src="https://fakeimg.pl/150x150/282828/eae0d0/"
                    alt="fake img"
                  />
                </div>
                <div className="adviser__badge-text">
                  <div className="badge__text-name">Nombre del Asesor</div>
                  <div className="badge__text-jobTitle">
                    Dedicación del Asesor
                  </div>
                  <div className="badge__text-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.rgt
                    Nihil, aspernatur vitae? Rem, non libero eos accusantium
                    deserunt sed. Officia repellendus placeat sunt eveniet
                    corporis provident inventore voluptatibus dolores temporibussss
                    obcaecati.
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Row>
  );
}



export default QuienesSomos;
