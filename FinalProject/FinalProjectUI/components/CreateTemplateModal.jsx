import { Button, Grid, TextInput } from "@mantine/core";
import { IconCheck, IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";

export default function CreateTemplateModal(props) {
    const [columns, setColumns] = useState([]);
    const [columnName, setColumnName] = useState("");
    const [name, setName] = useState("");

    const addColumn = () => {
        setColumns([...columns, {name: columnName}]);
    }

    const removeColumn = (column) => {

        setColumns(columns.filter((c) => {
            return c.name !== column.name;
        }));
    }

    const saveTemplate = () => {
        console.log('hi');
        const template = {
            name: name,
            columns: columns
        }

        for (let i = 0; i < columns.length; i ++) {
            template.columns[i].pos = i;
        }

        fetch('http://localhost:3002/Retrospective-Templates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(template)
        }).then((response) => {
            console.log(response);
            props.onSave();
        });
    }
    return <div>
        <TextInput
            placeholder="Retro Template Name"
            label="Name"
            radius="xs"
            withAsterisk
            onChange={(event) => {
                setName(event.target.value);
                }
            }
        />

        <br/>
        
        <Grid align="flex-end">
        {columns.map((column) => {
            return (<>
            <Grid.Col span={8}>   
            <span>{column.name}</span>
            </Grid.Col>
            <Grid.Col span={4}>
                <Button 
                color="red"
                onClick={(event) => {
                    removeColumn(column)
                    }
                } 
                leftIcon={<IconTrash />}></Button>
            </Grid.Col>
            </>);
        })}
            <Grid.Col span={8}>   <TextInput
                    placeholder="Retro Column"
                    label="Column"
                    radius="xs"
                    withAsterisk
                    onChange={(event) => {
                        setColumnName(event.target.value);
                        }
                    }
                />
            </Grid.Col>
            <Grid.Col span={4}>
                <Button onClick={addColumn} leftIcon={<IconPlus/>}></Button>
            </Grid.Col>
        </Grid>
        <Button className="submitBtn" onClick={saveTemplate} leftIcon={<IconCheck size="1rem" />}>Save</Button>
    </div>
}
