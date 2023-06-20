import React from "react";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

export default function Contact() {
  return (
    <>
      <Navigation />

      <div className="container mb-5">
        <div>
          <div className="d-flex">
            <div className="col-md-6">
              <div className="p-5">
                <img className="card-img-top" src="https://cdn.shopify.com/s/files/1/0030/9759/1872/files/Artisan_720x.png?v=1641295018" alt />
              </div>
              </div>
              <div className="col-md-6">
              <div className="mt-5 ">
                <div className="card-body mt-5">
                  <h3 className="card-title text-center">Our Mission</h3>
                  <small className="card-text">
Our mission is to curate beautifully handcrafted products from across the globe. We preserve the traditional art of India handed down to us by our ancestors, helping our talented artisans gain global recognition through the products that can be used on a daily basis in the urban market. Our vision is to be an International Brand synonym to craft. We are well on our way with a solemn goal to provide economic upliftment of the rural artisans that are involved in preserving the heritage of the handicrafts industry in India.</small>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex">
          <div className="col-md-6">
              <div className="mt-5 ">
                <div className="card-body mt-5">
                  <h3 className="card-title text-center">Made In India</h3>
                  <small className="card-text">
Indian Hadicraft is an online craft brand started in 2023 with a vision to promote Indian handicrafts globally & help small artisans based in different parts of India earn a living out of it.</small>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-5">
                <img className="card-img-top" src="https://cdn.shopify.com/s/files/1/0030/9759/1872/files/Artisan_1_720x.png?v=1641295038" alt />
              </div>
              </div>
          </div>
        </div>

        <div className="lh-1 card bg-light p-3">
          <h3 className="mb-1 text-dark lh-2">
            Indian Handicraft:The Indian Handicraft Catalogue
          </h3>

          <small className="text-sm-left lh-base font-normal text-lowercase text-decoration-none text-reset">
            Indian Handicraft is inspired by a generation that is highly
            connected with its roots. Hence, we have crafted this platform that
            connects you to the artisans of India and showcases their work by
            providing you with the best handicraft items online. We aim to make
            the experience of buying aesthetic and contemporary products online
            delightful for customers. Also, the core motive is to make sure the
            handicraft industry in India gets a digital boost. We are here to
            make purchasing products online convenient for your lifestyle,
            making life simpler & safer for you.
          </small>
        </div>
      </div>
      <Footer/>
    </>
  );
}
