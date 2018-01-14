import React from 'react'
import {Grid,Col,Table} from "react-bootstrap"

const Circle = ({circle}) => {
  return(
    <div>
      <div className="circlePicture"></div>
      <div className="circlePro">
        <h1>{circle.name}</h1>
        <h3>新入生へ</h3>
        <p>{circle.message_for_fresh}</p>
        <Table responsive>
    <tbody>
      <tr>
        <td>キャンパス</td>
        <td>{circle.campus}</td>
        <td>カテゴリ</td>
        <td>{circle.introduction}</td>
      </tr>
      <tr>
        <td>サークル人数</td>
        <td>{circle.number}人</td>
        <td>代表者</td>
        <td>{circle.delegete_name}</td>
      </tr>
      <tr>
        <td>男女比</td>
        <td>{circle.gender_ratio}</td>
        <td>連絡先</td>
        <td>{circle.delegete_contact}</td>
      </tr>
    </tbody>
  </Table>

      </div>
    </div>
  )
}

export default Circle
