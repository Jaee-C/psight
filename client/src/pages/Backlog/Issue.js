import React from "react";
import styled from '@emotion/styled';
import { Draggable } from "react-beautiful-dnd";
import OverflowMenu from "./OverflowMenu";
import { Input } from "reactstrap";
import "./styles.css";

import { ISSUE_STATUS } from "../../utils/constants";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  padding-left: 15px;
  background-color: white;
  margin-top: -1px;
  &:hover {
    background-color: #f2f3f5;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Col = styled.div`
  margin-left: 8px;
`;

const Issue = ({ issue, index }) => (
  <Draggable draggableId={issue.id.toString()} index={index} style={{width:"100%"}}>
    {(provided, snapshot) => (
      <Container
        key={issue.id}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <Row className="issue-item">
          <Col className="text-secondary">{issue.id}</Col>
          <Col style={{flex: "1 1 0%"}}>{issue.title}</Col>
          <Col>
            <Input type="select" bsSize="sm" defaultValue={issue.status} className="disable-outline">
              {ISSUE_STATUS.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </Input>
          </Col>
          {/* <Col>{issue.assignee}</Col> */}
          <Col><OverflowMenu /></Col>
        </Row>
      </Container>
    )}
  </Draggable>
);

export default Issue;