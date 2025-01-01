function editUser(button) {
    const userId = button.getAttribute('data-id');

    fetch(`/user/byId/${userId}`)
        .then(response => {
            if (!response.ok) throw new Error('Error en la petición');
            return response.json();
        })
        .then(userData => {
            Swal.fire({
                title: 'Editar Usuario',
                html: `
                    <div class="space-y-6 px-1">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Nombre
                            </label>
                            <input 
                                type="text" 
                                id="name" 
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition duration-200" 
                                value="${userData.name}" 
                                placeholder="Nombre"
                            >
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition duration-200" 
                                value="${userData.email}" 
                                placeholder="Email"
                            >
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Rol
                            </label>
                            <select id="role" 
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                bg-white transition duration-200">
                                <option value="administrador" ${userData.role === 'administrador' ? 'selected' : ''}>👑 Administrador</option>
                                <option value="trabajador" ${userData.role === 'trabajador' ? 'selected' : ''}>👷 Trabajador</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Nueva Contraseña
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition duration-200" 
                                placeholder="Dejar en blanco para mantener la actual"
                            >
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Confirmar Contraseña
                            </label>
                            <input 
                                type="password" 
                                id="password_confirmation" 
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition duration-200" 
                                placeholder="Confirmar nueva contraseña"
                            >
                        </div>
                    </div>
                `,
                customClass: {
                    container: 'font-sans',
                    popup: 'rounded-xl shadow-xl',
                    header: 'border-b pb-4',
                    title: 'text-xl font-bold text-gray-800',
                    content: 'pt-4',
                    confirmButton: 'px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200',
                    cancelButton: 'px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200'
                },
                showCancelButton: true,
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3B82F6',
                cancelButtonColor: '#6B7280',
                preConfirm: () => {
                    const data = {
                        id: userId,
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        role: document.getElementById('role').value,
                        password: document.getElementById('password').value,
                        password_confirmation: document.getElementById('password_confirmation').value
                    };

                    if (!data.name || !data.email || !data.role) {
                        Swal.showValidationMessage('Por favor, completa todos los campos obligatorios');
                        return null;
                    }

                    if (data.password && data.password !== data.password_confirmation) {
                        Swal.showValidationMessage('Las contraseñas no coinciden');
                        return null;
                    }

                    return fetch('/user/update', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error al actualizar el usuario');
                            }
                            return response.json();
                        })
                        .catch(error => {
                            Swal.showValidationMessage(`Error: ${error.message}`);
                        });
                }
            }).then(result => {
                if (result.isConfirmed && result.value.success) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: {popup: 'rounded-lg shadow-md'}
                    });

                    Toast.fire({
                        icon: 'success',
                        title: result.value.message
                    }).then(() => location.reload());
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo obtener la información del usuario',
                customClass: {popup: 'rounded-lg'}
            });
        });
}


function deleteUser(button) {
    const userId = button.getAttribute('data-id');

    Swal.fire({
        title: '¿Estás seguro?',
        html: `
            <div class="space-y-4">
                <div class="flex items-center justify-center">
                    <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div>
                <p class="text-gray-500 text-sm">Esta acción eliminará permanentemente al usuario y no podrá ser recuperado.</p>
            </div>
        `,
        showCancelButton: true,
        customClass: {
            container: 'swal2-container',
            popup: 'sm:max-w-md rounded-lg',
            title: 'text-xl font-bold text-gray-900 mb-4',
            htmlContainer: 'mt-4',
            actions: 'space-x-3 mt-6',
            confirmButton: 'px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
            cancelButton: 'px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
        },
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        reverseButtons: true,
        focusCancel: true
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('/user/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: userId})
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el usuario.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Usuario eliminado!',
                            html: `
                                <div class="text-gray-600">
                                    ${data.message}
                                </div>
                            `,
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            customClass: {
                                popup: 'rounded-lg',
                                title: 'text-lg font-semibold text-gray-900',
                                htmlContainer: 'mt-2'
                            }
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Atención',
                            html: `
                                <div class="text-gray-600">
                                    ${data.message || 'No se pudo eliminar el usuario.'}
                                </div>
                            `,
                            customClass: {
                                popup: 'rounded-lg',
                                title: 'text-lg font-semibold text-gray-900',
                                htmlContainer: 'mt-2',
                                confirmButton: 'px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            },
                            confirmButtonText: 'Entendido',
                            buttonsStyling: false
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: `
                            <div class="text-gray-600">
                                ${error.message || 'Ocurrió un problema al intentar eliminar el usuario.'}
                            </div>
                        `,
                        customClass: {
                            popup: 'rounded-lg',
                            title: 'text-lg font-semibold text-gray-900',
                            htmlContainer: 'mt-2',
                            confirmButton: 'px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        },
                        confirmButtonText: 'Entendido',
                        buttonsStyling: false
                    });
                });
        }
    });
}

function editTask(button) {
    const taskId = button.getAttribute('data-id');

    fetch(`/task/byId/${taskId}`)
        .then(response => response.json())
        .then(taskData => {
            Swal.fire({
                title: 'Actualizar Tarea',
                html: `
                    <div class="space-y-6 px-1">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Título
                            </label>
                            <p class="p-3 bg-gray-50 rounded-lg text-gray-700">${taskData.title}</p>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Estado
                            </label>
                            <select id="status" 
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                bg-white transition duration-200">
                                <option value="pendiente" ${taskData.status === 'pendiente' ? 'selected' : ''}>📋 Pendiente</option>
                                <option value="en_progreso" ${taskData.status === 'en_progreso' ? 'selected' : ''}>⏳ En Progreso</option>
                                <option value="completada" ${taskData.status === 'completada' ? 'selected' : ''}>✅ Completada</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Fecha límite
                            </label>
                            <input type="datetime-local" id="deadline" 
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition duration-200" 
                                value="${taskData.deadline.slice(0, 16)}">
                        </div>
                    </div>
                `,
                customClass: {
                    container: 'font-sans',
                    popup: 'rounded-xl shadow-xl',
                    header: 'border-b pb-4',
                    title: 'text-xl font-bold text-gray-800',
                    content: 'pt-4',
                    confirmButton: 'px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200',
                    cancelButton: 'px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200'
                },
                showCancelButton: true,
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3B82F6',
                cancelButtonColor: '#6B7280',
                preConfirm: () => {
                    const data = {
                        id: taskId,
                        status: document.getElementById('status').value,
                        deadline: document.getElementById('deadline').value + ':00'
                    };

                    if (!data.status || !data.deadline) {
                        Swal.showValidationMessage('Por favor, completa todos los campos');
                        return null;
                    }

                    return fetch('/task/update', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .catch(error => {
                            Swal.showValidationMessage(`Error: ${error}`);
                        });
                }
            }).then((result) => {
                if (result.isConfirmed && result.value.success) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: {popup: 'rounded-lg shadow-md'}
                    });

                    Toast.fire({
                        icon: 'success',
                        title: result.value.message
                    }).then(() => location.reload());
                }
            });
        })
        .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo obtener la información de la tarea',
                customClass: {popup: 'rounded-lg'}
            });
        });
}

function deleteTask(button) {
    const taskId = button.getAttribute('data-id');
    console.log('ID de la tarea:', taskId);

    Swal.fire({
        title: '¿Estás seguro?',
        html: `
            <div class="space-y-4">
                <div class="flex items-center justify-center">
                    <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div>
                <p class="text-gray-500 text-sm">Esta acción eliminará permanentemente la tarea y no podrá ser recuperado.</p>
            </div>
        `,
        showCancelButton: true,
        customClass: {
            container: 'swal2-container',
            popup: 'sm:max-w-md rounded-lg',
            title: 'text-xl font-bold text-gray-900 mb-4',
            htmlContainer: 'mt-4',
            actions: 'space-x-3 mt-6',
            confirmButton: 'px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
            cancelButton: 'px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
        },
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        reverseButtons: true,
        focusCancel: true
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('/task/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: taskId})
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar la tarea.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Tarea eliminada!',
                            html: `
                                <div class="text-gray-600">
                                    ${data.message}
                                </div>
                            `,
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            customClass: {
                                popup: 'rounded-lg',
                                title: 'text-lg font-semibold text-gray-900',
                                htmlContainer: 'mt-2'
                            }
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Atención',
                            html: `
                                <div class="text-gray-600">
                                    ${data.message || 'No se pudo eliminar la tarea.'}
                                </div>
                            `,
                            customClass: {
                                popup: 'rounded-lg',
                                title: 'text-lg font-semibold text-gray-900',
                                htmlContainer: 'mt-2',
                                confirmButton: 'px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            },
                            confirmButtonText: 'Entendido',
                            buttonsStyling: false
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: `
                            <div class="text-gray-600">
                                ${error.message || 'Ocurrió un problema al intentar eliminar la tarea.'}
                            </div>
                        `,
                        customClass: {
                            popup: 'rounded-lg',
                            title: 'text-lg font-semibold text-gray-900',
                            htmlContainer: 'mt-2',
                            confirmButton: 'px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        },
                        confirmButtonText: 'Entendido',
                        buttonsStyling: false
                    });
                });
        }
    });
}

function userModal() {
    Swal.fire({
        title: 'Crear Nuevo Usuario',
        html: `
            <form id="userForm" class="space-y-6 px-1">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                    <input type="text" id="name" 
                        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        placeholder-gray-400 transition duration-200"
                        placeholder="Ingresa el nombre completo">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" 
                        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        placeholder-gray-400 transition duration-200"
                        placeholder="ejemplo@correo.com">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Rol</label>
                    <select id="role" 
                        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        bg-white transition duration-200">
                        <option value="administrador">👑 Administrador</option>
                        <option value="trabajador">👤 Trabajador</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
                    <input type="password" id="password" 
                        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        placeholder-gray-400 transition duration-200"
                        placeholder="••••••••">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Confirmar Contraseña</label>
                    <input type="password" id="password_confirmation" 
                        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        placeholder-gray-400 transition duration-200"
                        placeholder="••••••••">
                </div>
            </form>
        `,
        customClass: {
            container: 'font-sans',
            popup: 'rounded-xl shadow-xl',
            header: 'border-b pb-4',
            title: 'text-xl font-bold text-gray-800',
            content: 'pt-4',
            confirmButton: 'px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200',
            cancelButton: 'px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200'
        },
        showCancelButton: true,
        confirmButtonText: 'Crear Usuario',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3B82F6',
        cancelButtonColor: '#6B7280',
        preConfirm: () => {
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                role: document.getElementById('role').value,
                password: document.getElementById('password').value,
                password_confirmation: document.getElementById('password_confirmation').value
            };

            return fetch('/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) throw new Error('Error en la creación');
                    return response.json();
                })
                .catch(error => {
                    Swal.showValidationMessage(`Error: ${error}`);
                });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    popup: 'rounded-lg shadow-md'
                }
            });

            Toast.fire({
                icon: 'success',
                title: 'Usuario creado exitosamente'
            }).then(() => {
                location.reload();
            });
        }
    });
}

function taskModal() {
    fetch('/users/all')
        .then(response => response.json())
        .then(users => {
            Swal.fire({
                title: 'Crear Nueva Tarea',
                html: `
                    <form id="taskForm" class="space-y-6 px-1">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Título de la Tarea</label>
                                <input type="text" id="title" 
                                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    placeholder-gray-400 transition duration-200"
                                    placeholder="Ingresa el título de la tarea">
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                                <textarea id="description" rows="3" 
                                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    placeholder-gray-400 transition duration-200 resize-none"
                                    placeholder="Describe los detalles de la tarea"></textarea>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                                    <select id="status" 
                                        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        bg-white transition duration-200">
                                        <option value="pendiente">📋 Pendiente</option>
                                        <option value="en_proceso">⏳ En Proceso</option>
                                        <option value="completada">✅ Completada</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">Asignar a</label>
                                    <select id="user_id" 
                                        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        bg-white transition duration-200">
                                        ${users.map(user => `
                                            <option value="${user.id}">
                                                👤 ${user.name}
                                            </option>
                                        `).join('')}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Fecha límite</label>
                                <input type="datetime-local" id="deadline" 
                                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    text-gray-700 transition duration-200">
                            </div>
                        </div>
                    </form>
                `,
                customClass: {
                    container: 'font-sans',
                    popup: 'rounded-xl shadow-xl',
                    header: 'border-b pb-4',
                    title: 'text-xl font-bold text-gray-800',
                    content: 'pt-4',
                    confirmButton: 'px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200',
                    cancelButton: 'px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200'
                },
                showCancelButton: true,
                confirmButtonText: 'Crear Tarea',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3B82F6',
                cancelButtonColor: '#6B7280',
                preConfirm: () => {
                    const formData = {
                        title: document.getElementById('title').value,
                        description: document.getElementById('description').value,
                        status: document.getElementById('status').value,
                        deadline: document.getElementById('deadline').value,
                        user_id: parseInt(document.getElementById('user_id').value)
                    };

                    return fetch('/task/store', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    })
                        .then(response => {
                            if (!response.ok) throw new Error('Error en la creación');
                            return response.json();
                        })
                        .catch(error => {
                            Swal.showValidationMessage(`Error: ${error}`);
                        });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: {
                            popup: 'rounded-lg shadow-md'
                        }
                    });

                    Toast.fire({
                        icon: 'success',
                        title: 'Tarea creada exitosamente'
                    }).then(() => {
                        location.reload();
                    });
                }
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los usuarios',
                customClass: {
                    popup: 'rounded-lg'
                }
            });
        });
}

function logout() {
    // Muestra la confirmación antes de cerrar sesión
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres cerrar sesión?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'No, cancelar',
        customClass: {
            confirmButton: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            cancelButton: 'px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Si confirma el cierre de sesión, realiza la solicitud POST al backend
            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cerrar sesión');
                    }
                    return response.json(); // Parsea la respuesta como JSON
                })
                .then(data => {
                    // Manejo de la respuesta JSON
                    if (data.success) {
                        // Notifica al usuario y redirige a la página de inicio
                        Swal.fire({
                            icon: 'success',
                            title: data.message || 'Sesión cerrada correctamente',
                            timer: 2000,
                            showConfirmButton: false,
                            toast: true,
                            position: 'top',
                            timerProgressBar: true
                        }).then(() => {
                            window.location.href = '/'; // Redirige al inicio
                        });
                    } else if (data.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.error,
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al cerrar la sesión',
                    });
                });
        }
    });
}

