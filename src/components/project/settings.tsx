import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { projectState, projectType } from "../../recoil/dashBoard/project";
import Menu from "./menu";

export default function Settings() {
    const location = useLocation();
    const { item } = location.state
    const [newProjectName, setNewProjectName] = useState(item.ProjectName);
    const [newLoginURL, setNewLoginURL] = useState(item.WebLoginURL);
    const [project, updateProject] = useRecoilState(projectState);


    const ChangeName = (e: any) => {
        setNewProjectName(e.target.value);
    }

    const ChangeLoginUrl = (e: any) => {
        setNewLoginURL(e.target.value);
    }

    const HandleSave = () => {

        let newPJArray = project.map((pj) => {
            if (pj.ProjectID === item.ProjectID) {
                return { ...pj, ProjectName: newProjectName }
            }
            return pj;
        });
        updateProject(newPJArray);

    }

    const HandleLoginURL = () => {
        let newPJArray = project.map((pj) => {
            if (pj.ProjectID === item.ProjectID) {
                return { ...pj, WebLoginURL: newLoginURL }
            }
            return pj;
        });
        updateProject(newPJArray);
    }

    const HandleDelete = () => {
        let newPJArray = project.filter((pj) => pj.ProjectID !== item.ProjectID);
        updateProject(newPJArray);
    }

    return (
        <div id="ApiKey" >
            <h1 className="font-bold text-black py-2 uppercase text-2xl">Settings</h1>
            <div className="bg-white p-3 text-black border rounded-lg mb-5">
                <div className="text-md font-medium ml-1">Project Name</div>
                <div className="flex w-full justify-between items-center">
                    <input className="h-12 text-lg bg-black/5 my-2 pl-3 rounded-lg w-full" placeholder={`${item.ProjectName}`} onChange={(e) => ChangeName(e)} />
                    <button className="w-20 h-10 border rounded-lg text-white bg-[#006ECD]  mx-4 font-semibold px-2 border-gray-400 shadow hover:text-gray-300" onClick={() => HandleSave()}> SAVE</button>
                    <button className="w-18 h-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded-lg shadow">Cancle</button>
                </div>
            </div>
            <div className="bg-white p-3 text-black border rounded-lg mb-5">
                <div className="text-md font-medium ml-1">Login URL</div>
                <div className="flex w-full justify-center items-center">
                    <input className="h-12 text-lg bg-black/5 my-2 pl-3 rounded-lg w-full" placeholder={`${item.WebLoginURL}`} onChange={(e) => ChangeLoginUrl(e)} />
                    <button className="w-20 h-10 border rounded-lg text-white bg-[#006ECD]  mx-4 font-semibold px-2 border-gray-400 shadow hover:text-gray-300" onClick={() => HandleLoginURL()}> SAVE</button>
                    <button className="w-18 h-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded-lg shadow">Cancle</button>
                </div>
            </div>
            <div className="bg-white p-3 text-black border rounded-lg mb-5">
                {item.RedirectURLs.map((pj: any, index: any) => {
                    return (
                        <div>
                            <div className="text-md font-medium ml-1">Redirect URL {index + 1}</div>
                            <div className="flex w-full justify-center items-center">
                                <input className="h-12 text-lg bg-black/5 my-2 pl-3 rounded-lg w-full" placeholder={`${item.RedirectURLs[index]}`} onChange={(e) => ChangeLoginUrl(e)} />
                                <button className="w-20 h-10 border rounded-lg text-white bg-[#006ECD] mx-4 font-semibold px-2 border-gray-400 shadow hover:text-gray-300" onClick={() => HandleLoginURL()}> SAVE</button>
                                <button className="w-18 h-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded-lg shadow">Cancle</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="bg-white p-4 text-black border rounded-lg">
                <div className="flex w-full justify-between items-center">
                    <div className="text-lg font-bold ml-1 text-red-500">Project Delete</div>
                    <button className="w-20 h-10 border rounded-lg bg-red-400" onClick={() => HandleDelete()}> Delete</button>
                </div>
            </div>

        </div>
    )
}