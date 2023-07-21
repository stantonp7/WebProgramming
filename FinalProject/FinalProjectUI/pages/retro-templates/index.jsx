import { Button, Container, Modal, Group } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import RetroCard from '../../components/RetroCard';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import CreateTemplateModal from '../../components/CreateTemplateModal';

export default function RetroTemplates() {
    const [opened, { open, close }] = useDisclosure(false);
    const [retroTemplates, setRetroTemplates] = useState([]); // [
    const fetchRetroTemplates = async () => {
        const response = await fetch('http://localhost:3002/Retrospective-Templates');
        const a = await response.json();
        setRetroTemplates(a.data);
    }
    useEffect(() => {
        fetchRetroTemplates();
    }, []);


    const openCreateRetroTemplateModal = () => {
        open();
    }

    const onCreateTemplate = () => {
        close();
        fetchRetroTemplates();
    }

    return (
    <>
    <Modal closeOnClickOutside={false} opened={opened} onClose={close} title="Create Retro Template" centered>
        {<CreateTemplateModal onSave={onCreateTemplate}></CreateTemplateModal>}
      </Modal>
    <Container>
        <Button onClick={openCreateRetroTemplateModal} leftIcon={<IconPlus size="1rem" />}>Create</Button>
        
        {retroTemplates.map((retroTemplate) => {
            return <RetroCard onDelete={fetchRetroTemplates} retroTemplate={retroTemplate} ></RetroCard>
        })}
    </Container>
    </>);
}