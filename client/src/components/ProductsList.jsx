  import React, {useContext, useEffect}from 'react'
  import ProductFinder from '../apis/ProductFinder'
  import { ProductsContext } from '../context/ProductsContext'

  const ProductsList = (props) => {
    const {products, setProducts} = useContext(ProductsContext)
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await ProductFinder.get("/");
          setProducts(response.data.data.products);
      }catch(err){}
      };

      fetchData();
    },[])




      return (
      <div className='list-group' style={{backgroundColor: 'mediumseagreen',width: 500,height: 600,padding: 20}}>
        <div className="container-main-scroller">
        <div className="media-scroller snaps-inline"></div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => {
              return(
                <div className='list-group' style={{backgroundColor: 'mediumseagreen'}}>
                    <div className="container">
                      <div className="row row-cols-1 row-cols-md-3 g-4">
                        {product &&
                          products.map((product) => (
                            <div key={product.id} className="col">
                              <div className="card h-100">
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                  <h5 className="card-title">{product.name}</h5>
                                  <p className="card-text">{product.description}</p>
                                  <p className="card-text">Price Range: {"$".repeat(product.price)}</p>
                                  {/*<p className="card-text">Ratings: {renderRating(product)}</p>
                                  <button onClick={(e) => handleUpdate(e, product.id)} className="btn btn-warning">Update</button>
                                  <button onClick={(e) => handleDelete(e, product.id)} className="btn btn-danger">Delete</button>*/}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
              )
          })}
    {/*<div className="col" style={{ width: 500,height: 600,padding: 20}}>
      <div className="card h-100">
        <img src="https://th.bing.com/th/id/R.e037b3d822aa456d1952a0d66c1dffcf?rik=jMnI6XOZFpgnbw&pid=ImgRaw&r=0" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">Honor 9 Lite</h5>
          <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <a className='btn btn-success'>Update</a>
          <a className='btn btn-warning'>Delete</a>
        </div>
      </div>
    </div>
    <div className="col" style={{ width: 500,height: 600,padding: 20}}>
      <div className="card h-100">
        <img src="https://th.bing.com/th/id/R.bd88a36e4d46ca13523cb3c3481c412f?rik=m0CGfb%2fck0ylFA&pid=ImgRaw&r=0" className="card-img-top"/>
        <div className="card-body">
          <h5 className="card-title">Tablet S7 FE</h5>
          <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <a className='btn btn-success'>Update</a>
          <a className='btn btn-warning'>Delete</a>
        </div>
      </div>
      </div>*/}
  </div>
  </div>

      </div>
      )
  }

  export default ProductsList;