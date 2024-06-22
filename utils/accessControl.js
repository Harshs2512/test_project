import { defineAbility } from "@casl/ability";
import { createContext, useEffect, useState } from "react";
import { createContextualCan } from "@casl/react";
import axios from "axios";
import { useSession } from "next-auth/react";

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

export default function GetAbility({ roleData }) {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [permission, setPermissions] = useState([]);

    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (session) {
                    const res = await axios.get(`/api/auth/adminsingle/${session?.user._id}`);
                    if (res.status === 201) {
                        setUser(res.data);
                    }
                    const res1 = await axios.get(`/api/auth/instructorsingle/${session?.user._id}`);
                    if (res1.status === 200) {
                        setUser(res1.data);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        const fetchRole = async () => {
            try {
                const res = await axios.get(`/api/rolesandpermission/getroles`);
                setRoles(res.data.roles);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        fetchRole();
    }, [session]);

    useEffect(() => {
        if (roles && user) {
            const newPermissions = user.roles.reduce((allPermissions, roleId) => {
                const role = roles.find((item) => item._id === roleId);
                if (role) {
                    allPermissions.push(...role.selectedpermission);
                }
                return allPermissions;
            }, []);
            setPermissions(newPermissions);
        }
    }, [roles, user]);

    return defineAbility((can) => {
        permission?.forEach((item) => {
            can(item);
        });
    });
};

export const getStaticProps = async () => {
    try {
        const data = await axios.get(`${process.env.NEXTAUTH_URL}/api/rolesandpermission/getroles`);
        console.log(data)
        const roleData = data?.data;
        return {
            props: { roleData }
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: { roleData: [] },
        };
    }
}