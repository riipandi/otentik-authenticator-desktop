#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Manager, Runtime, Window};
use tauri::{SystemTray, SystemTrayEvent};
use tauri_plugin_store::PluginBuilder;
mod menu;
// mod tray_menu;
mod otp_generator;


fn main() {
    // let system_tray = SystemTray::new().with_menu(tray_menu::tray_menu());
    let system_tray = SystemTray::new();
    let app = tauri::Builder::default();

    app
        .plugin(PluginBuilder::default().build())
        .menu(menu::menu())
        .setup(|app| {
            let win = app.get_window("main").unwrap();
            win.set_transparent_titlebar(true, true);

            // only include this code on debug builds
            #[cfg(debug_assertions)] {
                win.open_devtools();
            }

            // Listen for update messages
            win.listen("tauri://update-status".to_string(), move |msg| {
                println!("New status: {:?}", msg);
            });

            Ok(())
        })
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { .. } => {
                let main_window = app.get_window("main").unwrap();
                if main_window.is_visible().unwrap() {
                    main_window.hide().unwrap();
                } else {
                    main_window.set_focus().unwrap();
                }
            }
            SystemTrayEvent::RightClick { position: _, size: _, .. } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => {
                let item_handle = app.tray_handle().get_item(&id);
                match id.as_str() {
                "open" => {
                    let main_window = app.get_window("main").unwrap();
                    if main_window.is_visible().unwrap() {
                        main_window.hide().unwrap();
                        item_handle.set_title("Open Authenticator").unwrap();
                    } else {
                        main_window.set_focus().unwrap();
                        item_handle.set_title("Hide Authenticator").unwrap();
                    }
                }
                "hide" => {
                    let main_window = app.get_window("main").unwrap();
                    main_window.hide().unwrap();
                }
                "quit" => { std::process::exit(0); }
                _ => {}
            }},
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![otp_generator::generate_totp])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

use cocoa::appkit::{NSWindow, NSWindowStyleMask, NSWindowTitleVisibility};

pub trait WindowExt {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, title_transparent: bool, remove_toolbar: bool);
}

impl<R: Runtime> WindowExt for Window<R> {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, title_transparent: bool, remove_tool_bar: bool) {
        unsafe {
            let id = self.ns_window().unwrap() as cocoa::base::id;
            NSWindow::setTitlebarAppearsTransparent_(id, cocoa::base::YES);
            let mut style_mask = id.styleMask();
            style_mask.set(
                NSWindowStyleMask::NSFullSizeContentViewWindowMask,
                title_transparent,
            );

            if remove_tool_bar {
                style_mask.remove(
                    NSWindowStyleMask::NSClosableWindowMask
                        | NSWindowStyleMask::NSMiniaturizableWindowMask
                        | NSWindowStyleMask::NSResizableWindowMask,
                );
            }

            id.setStyleMask_(style_mask);

            id.setTitleVisibility_(if title_transparent {
                NSWindowTitleVisibility::NSWindowTitleHidden
            } else {
                NSWindowTitleVisibility::NSWindowTitleVisible
            });

            id.setTitlebarAppearsTransparent_(if title_transparent {
                cocoa::base::YES
            } else {
                cocoa::base::NO
            });
        }
    }
}
