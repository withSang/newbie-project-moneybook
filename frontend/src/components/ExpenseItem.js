import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function ExpenseItem( { item, setExpenseModified, setExpenseToEdit } ) {
    const {_id, userID, date, name, money, isPositive, isSchool } = item;
    const onUpdateClickHandle = () => {
        setExpenseToEdit(item);
    }
    
    const onDeleteClickHandle = () => {
        axios.delete('/api/expense/delete', {
            data : {
                userID,
                _id
            }
        }).then((result) => {
            alert('해당 항목이 삭제되었습니다.');
            setExpenseModified(true);
        }).catch((error) => {
            alert('항목 삭제에 실패했습니다. 나중에 다시 시도해주세요.');
        });
    }

    return (
        <Container>
            <Row>
                <Col xs={2}>{new Date(date).toLocaleString().split(". ").slice(0,3).join("/")}</Col>
                <Col xs={2}>{name}</Col>
                <Col xs={2}>{money}</Col>
                <Col xs={1}>{isPositive ? ("수입") : ("지출")}</Col>
                <Col xs={1}>{isSchool ? ("교내") : ("교외")}</Col>
                <Button variant="secondary" onClick={onUpdateClickHandle}>수정</Button>
                <Button variant="danger" onClick={onDeleteClickHandle}>삭제</Button>
            </Row>
        </Container>
    );
};

export default ExpenseItem;