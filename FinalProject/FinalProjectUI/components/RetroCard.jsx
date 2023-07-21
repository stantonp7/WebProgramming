import { Button, Card, Grid } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { IconEye, IconTrash } from "@tabler/icons-react";

export default function RetroCard(props) {
    const router = useRouter();
    const sortedColumns = props.retroTemplate.columns.sort((a, b) => {
        return a.pos - b.pos;
    });

    const deleteRetroTemplate = () => {
        fetch(`http://localhost:3002/Retrospective-Templates/${props.retroTemplate._id}`, {
            method: 'DELETE'
        }).then((response) => {
            console.log(response);
            if (props.onDelete){
                props.onDelete();
            }
        });
    }

    const navigateToRetroTemplate = () => {
        router.push(`/retro-templates/${props.retroTemplate._id}`);
    }
    
    return <Card shadow = "sm" padding="lg" radius="md" withBorder>
        <h1>{props.retroTemplate.name}</h1>
        <br/>
        <Grid>
            {sortedColumns.map((column) => {
                return <Grid.Col span={4}>
                    <Card shadow="sm" padding="sm" radius="md" withBorder>
                        <h3>{column.name}</h3>
                    </Card>
                </Grid.Col>
            })}
        </Grid>
        <div>
        <Button leftIcon={<IconEye/>} onClick={navigateToRetroTemplate} className="cardBtn" >View</Button>
        <Button leftIcon={<IconTrash/>} onClick={deleteRetroTemplate} color="red" className="cardBtn">Delete</Button>
        </div>
    </Card>
}