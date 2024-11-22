import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {createDockerDesktopClient} from "@docker/extension-api-client";

import {
  images,
  containers,
  dive
} from "./helper/docker";
import {JsonPipe} from '@angular/common';

interface Image {
  Id: string,
  RepoTags: string[],
}

interface Container {
  Id: string,
  Names: string[],
  Image: string,
  ImageID: string,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, TableModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private ddClient = createDockerDesktopClient();
  protected images: Image[] = [];
  protected containers: Container[] = [];

  ngOnInit(): void {
    console.log("AppComponent ngOnInit");
    (async () => {
      this.images = (await images(this.ddClient) as Image[]);
      this.containers = (await containers(this.ddClient) as Container[]);
    })();
  }

  protected readonly Object = Object;

  async dive(Id: string) {
    await dive(this.ddClient, Id);
  }
}
/*
Image:
{
    "Containers": -1,
    "Created": 1732085077,
    "Id": "sha256:e55abf3c13bc5772d7336d068ddfdcbf9c98c25c49284fd7a7eac27031c26d6b",
    "Labels": {
      "com.docker.desktop.extension.api.version": "0.3.4",
      "com.docker.desktop.extension.icon": "",
      "com.docker.extension.additional-urls": "",
      "com.docker.extension.categories": "",
      "com.docker.extension.changelog": "",
      "com.docker.extension.detailed-description": "",
      "com.docker.extension.publisher-url": "",
      "com.docker.extension.screenshots": "",
      "org.opencontainers.image.description": "Angular based docker extension",
      "org.opencontainers.image.title": "Angular Docker Extension",
      "org.opencontainers.image.vendor": "Sandip Chitale"
    },
    "ParentId": "",
    "RepoDigests": [
      "sandipchitale/kubernetes-dashboard@sha256:e55abf3c13bc5772d7336d068ddfdcbf9c98c25c49284fd7a7eac27031c26d6b"
    ],
    "RepoTags": [
      "sandipchitale/kubernetes-dashboard:1.0.0"
    ],
    "SharedSize": -1,
    "Size": 1173838404
  },

  Container:
  {
    "Id": "a7d50dca1f5d88b7bfe7b234d82d601e95e56575e264c4db1a6e28b55feedabe",
    "Names": [
      "/sandipchitale_docker-dive-desktop-extension-service"
    ],
    "Image": "sandipchitale/docker-dive:1.0.0",
    "ImageID": "sha256:27cb78dfd12fd8558cfa3fe3e02986a20625b869d2da9486fecd4cff7c0d7f4c",
    "Command": "/bin/sh",
    "Created": 1732254930,
    "Ports": [],
    "Labels": {
      "com.docker.compose.config-hash": "05dd3c25b6c63a3c4caff6de925df872d6bf4e8f38d4123b2223fcdca1a756d0",
      "com.docker.compose.container-number": "1",
      "com.docker.compose.depends_on": "",
      "com.docker.compose.image": "sha256:27cb78dfd12fd8558cfa3fe3e02986a20625b869d2da9486fecd4cff7c0d7f4c",
      "com.docker.compose.oneoff": "False",
      "com.docker.compose.project": "sandipchitale_docker-dive-desktop-extension",
      "com.docker.compose.project.config_files": "/home/sandipchitale/.docker/desktop/extensions/sandipchitale_docker-dive/vm/docker-compose.yaml",
      "com.docker.compose.project.working_dir": "/home/sandipchitale/.docker/desktop/extensions/sandipchitale_docker-dive/vm",
      "com.docker.compose.service": "dive",
      "com.docker.compose.version": "2.30.3",
      "com.docker.desktop.extension": "true",
      "com.docker.desktop.extension.api.version": "0.3.4",
      "com.docker.desktop.extension.icon": "",
      "com.docker.desktop.extension.name": "Dive",
      "com.docker.extension.additional-urls": "",
      "com.docker.extension.categories": "",
      "com.docker.extension.changelog": "",
      "com.docker.extension.detailed-description": "",
      "com.docker.extension.publisher-url": "",
      "com.docker.extension.screenshots": "",
      "org.opencontainers.image.description": "Integration with Dive CLI.",
      "org.opencontainers.image.title": "Dive",
      "org.opencontainers.image.vendor": "Sandip Chitale"
    },
    "State": "restarting",
    "Status": "Restarting (0) 3 seconds ago",
    "HostConfig": {
      "NetworkMode": "sandipchitale_docker-dive-desktop-extension_default"
    },
    "NetworkSettings": {
      "Networks": {
        "sandipchitale_docker-dive-desktop-extension_default": {
          "IPAMConfig": null,
          "Links": null,
          "Aliases": null,
          "MacAddress": "",
          "DriverOpts": null,
          "NetworkID": "5c3f61921479868d70947bb6b3508742992a63099dd97948619f9eac6a087925",
          "EndpointID": "",
          "Gateway": "",
          "IPAddress": "",
          "IPPrefixLen": 0,
          "IPv6Gateway": "",
          "GlobalIPv6Address": "",
          "GlobalIPv6PrefixLen": 0,
          "DNSNames": null
        }
      }
    },
    "Mounts": []
  },
 */
