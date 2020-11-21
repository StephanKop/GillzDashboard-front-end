import React, { useState, useEffect } from 'react';
import * as azdev from "azure-devops-node-api";
import * as ba from "azure-devops-node-api/BuildApi";
import * as bi from "azure-devops-node-api/interfaces/BuildInterfaces";
import '../App.scss';

const Builds = (props)  => {
    let orgUrl = "https://dev.azure.com/gillznl";
    let token: string = 'ebe47bad-962f-4d39-b3d8-b0af401c518a';
    let authHandler = azdev.getPersonalAccessTokenHandler(token);
    let connection = new azdev.WebApi(orgUrl, authHandler);

    async function run() {
        let project: string = "nocto";
        let build: ba.IBuildApi = await connection.getBuildApi();
        let defs: bi.DefinitionReference[] = await build.getDefinitions(project);

        defs.forEach((defRef: bi.DefinitionReference) => {
            console.log(`${defRef.name} (${defRef.id})`);
        });
    }

    run();

    return (
        <div></div>
    )
}

export default Builds;
