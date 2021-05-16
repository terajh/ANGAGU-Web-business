import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './style.css';
import api from '../../../api';
// 임시
import testImg from '../../../assets/product_test.jpeg';
import { Model3DForm } from '../../organisms';

type ProductInfo = {
  name: string;
  price: number;
  stock: number;
  group: string;
  desc: string;
  delivery_charge: number;
};

type PreviewURL = {
  productImg1: string;
  productImg2: string;
};

const ProductDetailTemplate: React.FC = () => {
  // state & variable
  const [productValue, setProductValue] = useState({} as ProductInfo);
  const [descImg, setDescImg] = useState(null as File | null);
  const [thumbImg, setThumbImg] = useState(null as File | null);
  const [detailImgs, setDetailImgs] = useState([] as Array<File | null>);
  const [detailImgOrder, setDetailImgOrder] = useState({});
  const [previewURL, setPreviewURL] = useState({} as PreviewURL);

  const history = useHistory();
  const imgFormData = new FormData();
  const productsGroupList: Array<string> = ['폭신폭신 의자', '안폭신폭신 의자', '물침대', '돌침대'];

  // comp
  const productGroup = productsGroupList.map(group => <option key={group}>{group}</option>);

  // method
  const submitProductInfo = async (evt: React.FormEvent<EventTarget>) => {
    evt.preventDefault();

    api.setAxiosDefaultHeader();
    const { status, data } = await api.upload('/company/products', {
      product_image: detailImgs,
      order: JSON.stringify(detailImgOrder),
      desc_image: descImg,
      thumb_image: thumbImg,
      description: productValue.desc,
      name: productValue.name,
      price: productValue.price,
      stock: productValue.stock,
      delivery_charge: productValue.delivery_charge,
    });
    if (status === 'success') {
      alert('OK!');
      alert(`submit Data!${productValue.name}`);
      history.push('/Main/Product');
    } else {
      console.log('fail for send product info');
    }
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    setProductValue({ ...productValue, [name]: value });
  };

  const handleDescImg = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files as FileList;
    setDescImg(files[0]);
    handleOnChange(evt);
  };
  const handleThumbImg = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files as FileList;
    setThumbImg(files[0]);
    handleOnChange(evt);
  };
  const handleDetailImg = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = evt.target as HTMLInputElement;
    const files = evt.target.files as FileList;
    // set preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL({ ...previewURL, [name]: reader.result });
    };
    reader.readAsDataURL(files[0]);

    // set img file
    const tempList = detailImgs;
    tempList[Number(name) - 1] = files[0]; // eslint 구조분해할당 선호 에러 발생.. 구조분해로 어떻게 해야하나 확인해보기
    setDetailImgs(tempList);

    console.log(detailImgs);
    // set order
    setDetailImgOrder({ ...detailImgOrder, [files[0].name]: Number(name) });
    // imgFormData.append(name, files[0]);
  };

  return (
    <Container>
      <Row className="product-detail__header">
        <Col className="product-detail__ttl-blk">
          <h4 className="product__title">상품 정보</h4>
        </Col>
        <Col className="product-detail__btn-blk">
          <Button type="submit" form="productPrimary">
            Submit
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs="5">
          <div className="product-img">
            <div className="product-img__content">
              <Form>
                <FormGroup>
                  <Label for="productThumbImg">상품 썸네일 이미지</Label>
                  <Input type="file" name="thumb_image" id="productThumbImg" onChange={handleThumbImg} />
                  <FormText color="muted">상품 썸네일 이미지를 넣어주세요 :)</FormText>
                </FormGroup>
                <FormGroup>
                  <Label for="productDetailImg">상품 상세 이미지</Label>
                  <Input type="file" name="1" onChange={handleDetailImg} />
                  {/* {previewURL.productImg1 && <img src={previewURL.productImg1} alt="" />} */}
                  <Input type="file" name="2" onChange={handleDetailImg} />
                  <Input type="file" name="3" onChange={handleDetailImg} />
                  <Input type="file" name="4" onChange={handleDetailImg} />
                  <Input type="file" name="5" onChange={handleDetailImg} />
                  <FormText color="muted">상품 상세 이미지를 넣어주세요 :)</FormText>
                </FormGroup>
                <FormGroup>
                  <Label for="productDescImg">상품 설명 이미지</Label>
                  <Input type="file" name="desc_image" id="productDescImg" onChange={handleDescImg} />
                  <FormText color="muted">상품 설명 이미지를 넣어주세요 :)</FormText>
                </FormGroup>
              </Form>
              <div className="content__main">{/* <img className="main-img" src={testImg} alt="" /> */}</div>
            </div>
          </div>
        </Col>
        <Col xs="7">
          <Form id="productPrimary" onSubmit={submitProductInfo}>
            <FormGroup>
              <Label for="productName">상품명</Label>
              <Input
                type="text"
                name="name"
                id="productName"
                defaultValue={productValue.name}
                onChange={handleOnChange}
                placeholder="상품 이름을 적어주세요."
              />
            </FormGroup>
            <FormGroup>
              <Label for="productPrice">상품 가격</Label>
              <Input
                type="number"
                name="price"
                id="productPrice"
                defaultValue={productValue.price}
                onChange={handleOnChange}
                placeholder="판매 가격을 적어주세요."
              />
            </FormGroup>
            <FormGroup>
              <Label for="deliveryCharge">배송비</Label>
              <Input
                type="number"
                name="delivery_charge"
                id="deliveryCharge"
                defaultValue={productValue.delivery_charge}
                onChange={handleOnChange}
                placeholder="배송비를 적어주세요."
              />
            </FormGroup>
            <FormGroup>
              <Label for="productStock">재고</Label>
              <Input
                type="number"
                name="stock"
                id="productStock"
                defaultValue={productValue.stock}
                onChange={handleOnChange}
                placeholder="판매 수량을 적어주세요."
              />
            </FormGroup>
            <FormGroup>
              <Label for="productGroup">그룹</Label>
              <Input
                type="select"
                name="group"
                id="productGroup"
                defaultValue={productValue.group}
                onChange={handleOnChange}
              >
                {productGroup}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="productDesc">상품 상세 설명</Label>
              <Input
                type="textarea"
                name="desc"
                id="productDesc"
                defaultValue={productValue.desc}
                onChange={handleOnChange}
                maxLength={500}
                placeholder="상품에 대한 간단한 설명을 적어주세요 :)"
              />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailTemplate;
