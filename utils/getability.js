// accessControl.js
import { defineAbility } from "@casl/ability";
import { createContext, useEffect, useState } from "react";
import { createContextualCan } from "@casl/react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function GetAbility() {
    const [ability, setAbility] = useState(null);
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [permission, setPermissions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (authData) {
                    const res = await axios.get(`/api/auth/adminsingle/${authData?.user._id}`);
                    setUser(res.data);
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
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        fetchRole();
    }, []);

    useEffect(() => {
        if (roles && user) {
            const permissions = user.roles.reduce((allPermissions, roleId) => {
                const role = roles.find((item) => item._id === roleId);
                if (role) {
                    allPermissions.push(...role.selectedpermission);
                }
                return allPermissions;
            }, []);

            setPermissions(permissions);
            const newAbility = defineAbility((can) => {
                permissions.forEach((item) => {
                    can(item);
                });
            });

            setAbility(newAbility);
        }
    }, [roles, user]);

    return ability;
}
