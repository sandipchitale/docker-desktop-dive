import {v1} from "@docker/extension-api-client-types";

export const images = async (ddClient: v1.DockerDesktopClient) => {
  try {
    return await ddClient.docker.listImages({all: true});
  } catch (e: any) {
    ddClient.desktopUI.toast.error(`Could not get images. ${e}`);
    console.log("Could not get images.", e);
    return 'Could not get images';
  }
};

export const containers = async (ddClient: v1.DockerDesktopClient) => {
  try {
    return await ddClient.docker.listContainers({all: true});
  } catch (e: any) {
    ddClient.desktopUI.toast.error(`Could not get containers. ${e}`);
    console.log("Could not get containers.", e);
    return 'Could not get containers';
  }
};

export const dive = async (ddClient: v1.DockerDesktopClient, Id: string): Promise<void> => {
  try {
    await ddClient.extension.host?.cli.exec('launchdive', [Id]);
  } catch (e: any) {
    ddClient.desktopUI.toast.error(`Could not dive images. ${e}`);
    console.log("Could dive images.", e);
  }
};
