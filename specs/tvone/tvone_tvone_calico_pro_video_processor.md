---
spec_id: admin/tvone-calico-pro
schema_version: ai4av-public-spec-v1
revision: 1
title: "tvONE CALICO PRO Control Spec"
manufacturer: tvONE
model_family: "CALICO PRO C7-PRO-2200"
aliases: []
compatible_with:
  manufacturers:
    - tvONE
  models:
    - "CALICO PRO C7-PRO-2200"
    - "CALICO PRO C7-PRO-1200"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - api.tvone.com
retrieved_at: 2026-04-30T19:35:53.603Z
last_checked_at: 2026-05-01T00:09:24.904Z
generated_at: 2026-05-01T00:09:24.904Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-01T00:09:24.904Z
  matched_actions: 72
  action_count: 72
  confidence: high
  summary: "All 72 spec actions matched literally to source; transport parameters (port 10001, baud 115200) verified; full bidirectional coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# tvONE CALICO PRO Control Spec

## Summary
tvONE CALICO PRO is a modular video processor (C7-PRO-2200 2U, C7-PRO-1200 1U) with a TCP/IP Command Line API on port 10001 and a diagnostic RS-232 port at 115200 baud. Commands use dot-notation property paths and method calls terminated by `\r\n`. Responses return `!Done` or `!Failed`. Login with username/password is required before issuing commands. The API covers device info, system config, input/output slot modules (HDMI, SDI, HDBaseT, streaming media), window/canvas/layout routing, storyboards (presets), labels, resources (EDID, test patterns, images, resolutions, playlists), and event subscriptions.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 10001
serial:
  baud_rate: 115200
  # UNRESOLVED: data_bits, parity, stop_bits not stated in source for RS-232
auth:
  type: credential
  description: "Login(username,password) required before any other commands. Roles: Administrator, PowerUser, User, Test."
```

## Traits
```yaml
traits:
  - powerable    # System.Reset() reboots device; Slot<n>.Out<n>.EcoMode; Slot<n>.Update.Reboot()
  - queryable    # Extensive property read support across all namespaces
  - routable     # Window.Input assignment, Canvas/Window/Output routing, Output maps
  - levelable    # AudioVolume 0-100 on outputs/canvases; FTB 0-256 on windows; SCurve on outputs
```

## Actions
```yaml
actions:
  - id: login
    label: Login
    kind: action
    command: Login(username,password)
    description: "Authenticate with the device. Required before any other commands."
    params:
      - name: username
        type: string
        description: "User account name"
      - name: password
        type: string
        description: "User account password"
    response: "!Info : User <username> Logged In"

  - id: logout
    label: Logout
    kind: action
    command: Logout()
    description: "Log out the current user."
    response: "!Info : User <username> Logged Out"

  - id: start_batch
    label: Start Batch
    kind: action
    command: StartBatch()
    description: "Group write commands together. Effects deferred until EndBatch(). Read commands still processed immediately."

  - id: end_batch
    label: End Batch
    kind: action
    command: EndBatch()
    description: "Execute all commands queued since StartBatch()."

  - id: system_reset
    label: System Reset
    kind: action
    command: System.Reset()
    description: "Reboot the device."

  - id: save_all_settings
    label: Save All Settings
    kind: action
    command: System.SaveAllSettings()
    description: "Save current configuration to persistent memory."

  - id: save_system_settings
    label: Save System Settings
    kind: action
    command: System.SaveSystemSettings()
    description: "Save Device and System settings only."

  - id: save_resources
    label: Save Resources
    kind: action
    command: System.SaveResources()
    description: "Save Resources settings including TPG, Resolutions, IP Streams."

  - id: save_live_config
    label: Save Live Config
    kind: action
    command: System.SaveLiveConfig()
    description: "Save current Aliases, Routing and Slots settings."

  - id: restore_all
    label: Restore All Settings
    kind: action
    command: System.RestoreAll()
    description: "Restore all saved settings. Administrator only."

  - id: clear_saved_settings
    label: Clear Saved Settings
    kind: action
    command: System.ClearSavedSettings()
    description: "Clear all saved settings. Administrator only."

  - id: backup_to_sdcard
    label: Backup to Storage
    kind: action
    command: System.BackupToSDCard()
    description: "Backup settings including presets to device storage."

  - id: restore_backup
    label: Restore Backup
    kind: action
    command: System.RestoreBackup()
    description: "Restore all backed up settings. Administrator only."

  - id: firmware_update
    label: Firmware Update
    kind: action
    command: Device.SoftwareUpdate()
    description: "Initiate firmware update from onboard storage (FTP uploaded)."

  - id: media_card_update
    label: Media Card Update
    kind: action
    command: Device.MediaCardUpdate()
    description: "Update CPU firmware on streaming media / 4K playback card, then reboot."

  - id: set_window_input
    label: Set Window Input
    kind: action
    command: "<window>.Input = <input>"
    description: "Route an input to a window. Use FullName e.g. Slot3.In1."
    params:
      - name: window
        type: string
        description: "Window name e.g. Window1"
      - name: input
        type: string
        description: "Input fullname e.g. Slot3.In1"

  - id: set_window_position
    label: Set Window Position
    kind: action
    command: "<window>.CenterX = <x>"
    description: "Set window center X/Y coordinates, width, height."
    params:
      - name: window
        type: string
      - name: property
        type: string
        description: "CenterX, CenterY, Width, Height"
      - name: value
        type: integer

  - id: set_window_canvas
    label: Set Window Canvas
    kind: action
    command: "<window>.Canvas = <canvas>"
    description: "Assign window to a canvas. Set to NULL to remove."
    params:
      - name: window
        type: string
      - name: canvas
        type: string

  - id: window_mute
    label: Window Mute
    kind: action
    command: "<window>.Mute = <On|Off>"
    description: "Mute or unmute a window."

  - id: set_output_resolution
    label: Set Output Resolution
    kind: action
    command: "Slot<n>.Out<n>.Resolution = <resolution>"
    description: "Set the output resolution string e.g. 1920x1080p60."
    params:
      - name: output
        type: string
        description: "Output path e.g. Slot1.Out1"
      - name: resolution
        type: string

  - id: output_cut_to_black
    label: Output Cut To Black
    kind: action
    command: "Slot<n>.Out<n>.CutToBlack = <On|Off>"
    description: "Black out output and mute audio. Use StartBatch/EndBatch for sync across multiple outputs."
    params:
      - name: output
        type: string
      - name: state
        type: string
        description: "On or Off"

  - id: output_eco_mode
    label: Output Eco Mode
    kind: action
    command: "Slot<n>.Out<n>.EcoMode = <On|Off>"
    description: "Allow attached monitor to enter standby. Does not persist over power cycle."

  - id: output_audio_enable
    label: Output Audio Enable
    kind: action
    command: "Slot<n>.Out<n>.AudioEnable = <On|Off>"

  - id: output_audio_mute
    label: Output Audio Mute
    kind: action
    command: "Slot<n>.Out<n>.AudioMute = <On|Off>"

  - id: canvas_cut_to_black
    label: Canvas Cut To Black
    kind: action
    command: "<canvas>.CutToBlack = <On|Off>"
    description: "Black out all outputs/maps on the canvas."

  - id: canvas_audio_volume
    label: Canvas Audio Volume
    kind: action
    command: "<canvas>.AudioVolume = <0-100>"
    description: "Set canvas audio volume 0-100 percent."
    params:
      - name: canvas
        type: string
      - name: volume
        type: integer
        description: "0-100 percent"

  - id: canvas_audio_mute
    label: Canvas Audio Mute
    kind: action
    command: "<canvas>.AudioMute = <On|Off>"

  - id: canvas_audio_source
    label: Canvas Audio Source
    kind: action
    command: "<canvas>.AudioSource = <source>"
    description: "Set audio source for the canvas."

  - id: canvas_audio_mode
    label: Canvas Audio Mode
    kind: action
    command: "<canvas>.AudioMode = <FromSource|FollowWindow>"

  - id: storyboard_take
    label: Storyboard Take
    kind: action
    command: "Stbds.Stbd<n>.Take()"
    description: "Recall/execute a storyboard (preset)."
    params:
      - name: storyboard
        type: string
        description: "Storyboard name e.g. Stbd1"

  - id: storyboard_save
    label: Storyboard Save
    kind: action
    command: "Stbds.Stbd<n>.Save()"
    description: "Persist storyboard to filesystem."

  - id: storyboard_remove
    label: Storyboard Remove
    kind: action
    command: "Stbds.Stbd<n>.Remove()"
    description: "Clear/delete a storyboard."

  - id: preset_take
    label: Preset Take (Deprecated)
    kind: action
    command: "Routing.Preset.Take = <1-49>"
    description: "Recall preset by ID. Deprecated in favour of Storyboards."
    params:
      - name: preset_id
        type: integer
        description: "Preset ID 1-49"

  - id: add_events
    label: Subscribe Events
    kind: action
    command: AddEvents(eventCategory)
    description: "Subscribe to an event category. Events arrive asynchronously."
    params:
      - name: eventCategory
        type: string
        description: "Category name e.g. HDMI, WINDOW, CANVAS, LAYOUT, OUTPUTS_SYNC, STBD, PRESET, MODULE, MEDIA_PLAYER, MEDIA_STORAGE, SYSTEM, SECURITY, CANVAS_OPTIONS, OUTPUT"

  - id: remove_events
    label: Unsubscribe Events
    kind: action
    command: RemoveEvents(eventCategory)
    params:
      - name: eventCategory
        type: string

  - id: list_events
    label: List Subscribed Events
    kind: action
    command: ListEvents()
    description: "List currently subscribed event categories."

  - id: list_all_events
    label: List All Available Events
    kind: action
    command: ListAllEvents(eventCategory)
    description: "List all available events, optionally filtered by category."
    params:
      - name: eventCategory
        type: string
        description: "Optional category filter"

  - id: set_ethernet_ip
    label: Set Ethernet IP Address
    kind: action
    command: "System.Comms.Ethernet.IPAddress = <ip>"
    description: "Set static IP. Takes effect after RestartEthernet or save."

  - id: set_ethernet_port
    label: Set Command Port
    kind: action
    command: "System.Comms.Ethernet.CommandPort = <port>"
    description: "Set the TCP command port. Takes effect after restart."

  - id: restart_ethernet
    label: Restart Ethernet
    kind: action
    command: System.Comms.Ethernet.RestartEthernet()
    description: "Restart Ethernet adapter. New settings applied on restart."

  - id: save_ethernet_config
    label: Save Ethernet Config
    kind: action
    command: System.Comms.Ethernet.SaveEthernetConfig()
    description: "Permanently save network settings."

  - id: set_output_alias
    label: Set Output Alias
    kind: action
    command: "Slot<n>.Out<n>.Alias = <name>"
    description: "Set an alias name for an output."

  - id: set_window_alias
    label: Set Window Alias
    kind: action
    command: "<window>.Alias = <name>"
    description: "Set alias. Once set, alias can be used to reference the window."

  - id: set_output_scurve
    label: Set Output SCurve
    kind: action
    command: "Slot<n>.Out<n>.SCurve = <0.30-2.00>"
    description: "Set brightness curve for output."

  - id: set_window_ftb
    label: Set Window Fade To Black
    kind: action
    command: "<window>.FTB = <0-256>"
    description: "Set window brightness. 0=full, 256=black."
    params:
      - name: window
        type: string
      - name: value
        type: integer
        description: "0 (full brightness) to 256 (black)"

  - id: set_unit_description
    label: Set Unit Description
    kind: action
    command: "System.UnitDescription = <name>"
    description: "Set device name, max 32 ASCII chars."

  - id: hdcp_clear_keys
    label: Clear HDCP Keys
    kind: action
    command: System.HDCPClearKeyFile()
    description: "Clear internal cache of HDCP keys."

  - id: clear_all_output_maps
    label: Clear All Output Maps
    kind: action
    command: System.ClearAllOutputMaps()
    description: "Remove all maps from all outputs."

  - id: phase_retrain
    label: Phase Retrain
    kind: action
    command: "Slot<n>.PhaseRetrain()"
    description: "Force a phase retrain on a plugin module."

  - id: output_maps_clear_all
    label: Clear Output Maps
    kind: action
    command: "Slot<n>.Out<n>.Maps.ClearAll()"
    description: "Remove all maps from a specific output."

  - id: output_map_clear
    label: Clear Output Map
    kind: action
    command: "Slot<n>.Out<n>.Maps.Map<n>.Clear()"
    description: "Remove a specific map from an output."

  - id: tpg_set_pattern
    label: Set Test Pattern
    kind: action
    command: "Resources.TPG.TPG1.Pattern = <pattern>"
    description: "Set test pattern generator pattern."

  - id: label_apply
    label: Label Apply
    kind: action
    command: "Label<n>.Apply()"
    description: "Apply all changes for a label and regenerate it."

  - id: label_clear
    label: Label Clear
    kind: action
    command: "Label<n>.Clear()"
    description: "Remove the label and reset to defaults."

  - id: media_play
    label: Media Play
    kind: action
    command: "Slot<n>.In<n>.ActiveQueue.Play()"
    description: "Start/continue playback of play queue on streaming media input."

  - id: media_stop
    label: Media Stop
    kind: action
    command: "Slot<n>.In<n>.ActiveQueue.Stop()"
    description: "Stop playback and reset index to start."

  - id: media_pause
    label: Media Pause
    kind: action
    command: "Slot<n>.In<n>.ActiveQueue.Pause()"

  - id: media_skip_forward
    label: Media Skip Forward
    kind: action
    command: "Slot<n>.In<n>.ActiveQueue.SkipForward()"

  - id: media_skip_backward
    label: Media Skip Backward
    kind: action
    command: "Slot<n>.In<n>.ActiveQueue.SkipBackward()"

  - id: module_reboot
    label: Module Reboot
    kind: action
    command: "Slot<n>.Update.Reboot(option)"
    description: "Reboot streaming media module. Option: ForceUpdate to force update."
    params:
      - name: option
        type: string
        description: "Optional: ForceUpdate"

  - id: install_edid
    label: Install EDID
    kind: action
    command: System.EdidUtils.InstallEdid(filename)
    description: "Install a user EDID already uploaded to the device."

  - id: remove_user_edids
    label: Remove User EDIDs
    kind: action
    command: System.EdidUtils.RemoveUserEdids()

  - id: set_output_colour_scale
    label: Set Output Colour Scale
    kind: action
    command: "Slot<n>.Out<n>.ColourScale = <value>"
    description: "Values: SDR_YCCL_601, SDR_YCCL_709, SDR_RGBL_709, SDR_RGBF_709, HLG_YCCL_2020, HDR10_YCCL_2020"

  - id: set_output_edge_blend
    label: Set Output Edge Blend
    kind: action
    command: "Slot<n>.Out<n>.EdgeBlendMode = <Off|Normal|Projector>"

  - id: set_lock_mode
    label: Set Lock Mode
    kind: action
    command: "Routing.Layouts.OutputsSync.LockMode = <Synclock|Framelock|RefLock>"
    description: "Set output lock mode for layouts."

  - id: set_lock_source
    label: Set Lock Source
    kind: action
    command: "Routing.Layouts.OutputsSync.LockSource = <source>"
    description: "Set frame lock source. Values: NULL, alias, or SlotX.InY."

  - id: hdaset_link_reset_local
    label: HDBaseT Local Link Reset
    kind: action
    command: "Slot<n>.In<n>.HDBaseT.LocalLinkReset()"

  - id: hdaset_link_reset_remote
    label: HDBaseT Remote Link Reset
    kind: action
    command: "Slot<n>.In<n>.HDBaseT.RemoteLinkReset()"

  - id: set_synclock_inhibit
    label: Set Synclock Inhibit
    kind: action
    command: "System.SynclockInhibit = <On|Off>"
    description: "Disable automatic display synchronisation."

  - id: set_preset_easing
    label: Set Preset Easing
    kind: action
    command: "System.PresetEasing = <On|Off>"
    description: "Enable key frame easing."

  - id: images_remove_all
    label: Remove All Images
    kind: action
    command: Resources.Images.RemoveAll()
    description: "Delete all stored images. Irreversible."

  - id: force_link_refresh
    label: Force Link Refresh
    kind: action
    command: "Slot<n>.Out<n>.ForceLinkRefresh()"
    description: "Force HDMI link refresh on an output. Required after setting HDRStaticMetadata."
```

## Feedbacks
```yaml
feedbacks:
  - id: device_model_name
    label: Device Model Name
    type: string
    command: Device.ModelName
    description: "Read-only model name e.g. CALICO Pro"

  - id: device_model_number
    label: Device Model Number
    type: string
    command: Device.ModelNumber
    description: "Read-only model number e.g. C7-PRO-2200"

  - id: device_serial_number
    label: Device Serial Number
    type: string
    command: Device.SerialNumber

  - id: device_firmware_version
    label: Firmware Version
    type: string
    command: Device.SoftwareVersion

  - id: api_version
    label: API Version
    type: string
    command: System.APIVersion

  - id: system_status
    label: System Status
    type: enum
    command: System.Status
    values: [Serving, Busy]

  - id: system_alerts
    label: System Alerts
    type: enum
    command: System.Alerts
    values: [OK, Critical_PF, Critical_BF, Critical_MCF, Error_FF, Error_OTF, Critical_FF, Critical_FSRead, Critical_DMA]

  - id: module_update_status
    label: Module Update Status
    type: enum
    command: System.ModuleUpdateStatus
    values: [Booting, Updating, Ready, UpdateFailed]

  - id: input_status
    label: Input Status
    type: enum
    command: "Slot<n>.In<n>.Status"
    values: [OK, Invalid]

  - id: input_measured_resolution
    label: Input Measured Resolution
    type: string
    command: "Slot<n>.In<n>.MeasuredResolution"

  - id: input_hdcp_status
    label: Input HDCP Status
    type: enum
    command: "Slot<n>.In<n>.HDCPStatus"
    values: [None, v1_4, v2_2]

  - id: input_hdmi
    label: Input HDMI Detection
    type: enum
    command: "Slot<n>.In<n>.HDMI"
    values: [Found, Not_found]

  - id: output_hdmi
    label: Output HDMI Detection
    type: string
    command: "Slot<n>.Out<n>.HDMI"

  - id: output_hdcp_active
    label: Output HDCP Active
    type: enum
    command: "Slot<n>.Out<n>.HDCPActive"
    values: [Active, Off]

  - id: output_resolution
    label: Output Resolution
    type: string
    command: "Slot<n>.Out<n>.Resolution"

  - id: output_resolution_dimensions
    label: Output Resolution Dimensions
    type: string
    command: "Slot<n>.Out<n>.ResolutionWidth, ResolutionHeight, ResolutionFieldRate"

  - id: output_cut_to_black_state
    label: Output Cut To Black State
    type: enum
    command: "Slot<n>.Out<n>.CutToBlack"
    values: [On, Off]

  - id: lock_status
    label: Lock Status
    type: enum
    command: Routing.Layouts.OutputsSync.LockStatus
    values: [Off, Acquiring, Locked]

  - id: lock_accuracy
    label: Lock Accuracy
    type: integer
    command: Routing.Layouts.OutputsSync.LockAccuracy
    description: "100 or less = locked. 0-1024 range."

  - id: window_status
    label: Window Status
    type: string
    command: "<window>.Status"
    description: "FREE or assigned"

  - id: canvas_stbd_current
    label: Canvas Current Storyboard
    type: string
    command: "<canvas>.StbdCurrent"
    description: "NULL if no storyboard active."

  - id: storyboard_is_current
    label: Storyboard Is Current
    type: enum
    command: "Stbds.Stbd<n>.IsCurrent"
    values: [Yes, No]

  - id: ethernet_ip_address
    label: Ethernet IP Address
    type: string
    command: System.Comms.Ethernet.IPAddress

  - id: ethernet_command_port
    label: Ethernet Command Port
    type: integer
    command: System.Comms.Ethernet.CommandPort

  - id: ethernet_mac_address
    label: Ethernet MAC Address
    type: string
    command: System.Comms.Ethernet.MACAddress

  - id: system_uptime
    label: System Uptime
    type: string
    command: System.Time.Uptime
    description: "Seconds since boot."

  - id: system_time
    label: System Time
    type: string
    command: System.Time.CurrentTime
    description: "Format YYYY/MM/DD hh:mm:ss"

  - id: constraints_max_inputs
    label: Max Inputs
    type: integer
    command: System.Constraints.MaxInputs

  - id: constraints_max_outputs
    label: Max Outputs
    type: integer
    command: System.Constraints.MaxOutputs

  - id: constraints_max_windows
    label: Max Windows
    type: integer
    command: System.Constraints.MaxWindows

  - id: constraints_max_canvases
    label: Max Canvases
    type: integer
    command: System.Constraints.MaxCanvases

  - id: constraints_max_storyboards
    label: Max Storyboards
    type: integer
    command: System.Constraints.MaxStoryboards

  - id: fan_speed
    label: Fan Speed
    type: integer
    command: System.TemperatureControl.FanSpeed
    description: "0-100%"

  - id: fan_rpm
    label: Fan RPM
    type: integer
    command: "System.TemperatureControl.FanInlet0_RPM, FanInlet1_RPM, FanInlet2_RPM"

  - id: module_status
    label: Module Status
    type: enum
    command: "Slot<n>.Status"
    values: [READY, SHUTDOWN, BOOTING, UPDATING, BOOTFAILED, UPDATEFAILED, WAITFORVERSION, CARDFAILED]

  - id: media_queue_status
    label: Media Queue Status
    type: enum
    command: "Slot<n>.In<n>.ActiveQueue.Status"
    values: [Idle, Configured, Connecting, Playing, Paused, Disconnecting, Retrying]

  - id: media_queue_index
    label: Media Queue Current Index
    type: integer
    command: "Slot<n>.In<n>.ActiveQueue.CurrentIndex"

  - id: hdbaset_current_mode
    label: HDBaseT Current Mode
    type: string
    command: "Slot<n>.In<n>.HDBaseT.CurrentMode"

  - id: slot_cardtype
    label: Slot Card Type
    type: string
    command: "Slot<n>.Cardtype"
    description: "e.g. HDMI_4K 4-in, SDI_12G 4-OUT, HDBASET 2-in, MEDIA_4K IN"
```

## Variables
```yaml
variables:
  - id: output_audio_volume
    label: Output Audio Volume
    type: integer
    command: "Slot<n>.Out<n>.AudioVolume"
    description: "Per-output audio volume"

  - id: output_scurve
    label: Output SCurve (Brightness Curve)
    type: number
    command: "Slot<n>.Out<n>.SCurve"
    min: 0.30
    max: 2.00

  - id: canvas_audio_volume
    label: Canvas Audio Volume
    type: integer
    command: "<canvas>.AudioVolume"
    min: 0
    max: 100
    description: "0-100 percent, default 100"

  - id: window_ftb
    label: Window Fade To Black
    type: integer
    command: "<window>.FTB"
    min: 0
    max: 256
    description: "0=full brightness, 256=black"

  - id: window_width
    label: Window Width
    type: integer
    command: "<window>.Width"
    description: "14-bit unsigned integer"

  - id: window_height
    label: Window Height
    type: integer
    command: "<window>.Height"
    description: "14-bit unsigned integer"

  - id: window_center_x
    label: Window Center X
    type: integer
    command: "<window>.CenterX"
    description: "14-bit signed integer"

  - id: window_center_y
    label: Window Center Y
    type: integer
    command: "<window>.CenterY"
    description: "14-bit signed integer"

  - id: window_rotation
    label: Window Rotation
    type: integer
    command: "<window>.Rotation"
    min: 0
    max: 359

  - id: window_zorder
    label: Window Z-Order
    type: integer
    command: "<window>.Zorder"
    description: "Depth within canvas. 4-bit unsigned."

  - id: unit_description
    label: Unit Description
    type: string
    command: System.UnitDescription
    description: "Device name, max 32 chars."

  - id: ethernet_ip_address
    label: Ethernet IP Address
    type: string
    command: System.Comms.Ethernet.IPAddress

  - id: ethernet_port
    label: Ethernet Command Port
    type: integer
    command: System.Comms.Ethernet.CommandPort

  - id: rs232_baudrate
    label: RS-232 Baud Rate
    type: integer
    command: System.Comms.RS232.Baudrate

  - id: fan_speed
    label: Fan Speed Percent
    type: integer
    command: System.TemperatureControl.FanSpeed
    min: 0
    max: 100

  - id: tpg_pattern
    label: Test Pattern
    type: enum
    command: Resources.TPG.TPG1.Pattern
    values: [Black, RGB_100, Grid_8x8, Dot, ChqBrd_8x8, Vertical_Lines, Horizontal_Lines, Bars_n_Ramps, Solid_Black, Blue, Red, Magenta, Green, Cyan, Yellow, White]

  - id: tpg_moving_bar
    label: Test Pattern Moving Bar
    type: enum
    command: Resources.TPG.TPG1.MovingBar
    values: [On, Off]

  - id: tpg_resolution
    label: Test Pattern Resolution
    type: string
    command: Resources.TPG.TPG1.Resolution

  - id: output_colour_sampling
    label: Output Colour Sampling
    type: enum
    command: "Slot<n>.Out<n>.ColourSampling"
    values: [s444_8, s422_10, s420_8]

  - id: output_colour_scale
    label: Output Colour Scale
    type: enum
    command: "Slot<n>.Out<n>.ColourScale"
    values: [SDR_YCCL_601, SDR_YCCL_709, SDR_RGBL_709, SDR_RGBF_709, HLG_YCCL_2020, HDR10_YCCL_2020]

  - id: layout_framerate
    label: Layout Frame Rate
    type: string
    command: "<layout>.FrameRate"
    description: "e.g. p60, i60, p30"

  - id: layout_lock
    label: Layout Lock
    type: enum
    command: "<layout>.Lock"
    values: [Yes, No]

  - id: lock_mode
    label: Lock Mode
    type: enum
    command: Routing.Layouts.OutputsSync.LockMode
    values: [Synclock, Framelock, RefLock]

  - id: media_play_mode
    label: Media Play Mode
    type: enum
    command: "Slot<n>.In<n>.ActiveQueue.PlayMode"
    values: [Single, Repeat]

  - id: media_play_on_startup
    label: Media Play On Startup
    type: enum
    command: "Slot<n>.In<n>.ActiveQueue.PlayOnStartup"
    values: [On, Off]
```

## Events
```yaml
events:
  - id: window_input_changed
    label: Window Input Changed
    category: WINDOW
    syntax: "!Event WINDOW,INPUT,<window>,<input>"
    description: "Triggered when window source changes."

  - id: output_property_changed
    label: Output Property Changed
    category: OUTPUT
    syntax: "!Event OUTPUT,PROPERTY_CHANGED,<output>,<property>,<value>"
    description: "Raised when AudioEnable, AudioMute, CutToBlack changes on an output."

  - id: output_status_group
    label: Output Status Changed
    category: OUTPUT
    syntax: "!Event OUTPUT,STATUS_GROUP,<output>,<property>,<value>"
    description: "HDCPActive, HDMI, FramelockStatus, Genlock changes."

  - id: hdmi_sink_attached
    label: HDMI Sink Attached
    category: HDMI
    syntax: "!Event HDMI,SINK_ATTACHED,<output>"

  - id: hdmi_sink_unplugged
    label: HDMI Sink Unplugged
    category: HDMI
    syntax: "!Event HDMI,SINK_UNPLUGGED,<output>"

  - id: input_status_group
    label: Input Status Changed
    category: STATUS_GROUP
    syntax: "!Event STATUS_GROUP,<input>,<property>,<value>"
    description: "Input property change: Status, MeasuredResolution, HDCPStatus, HDMI, ColourSampling, Audio, etc."

  - id: canvas_property_changed
    label: Canvas Property Changed
    category: CANVAS
    syntax: "!Event CANVAS,PROPERTY_CHANGED,<canvas>,<property>,<value>"
    description: "AudioMute, AudioMode, AudioFollowWindow, AudioSource, AudioVolume changes."

  - id: canvas_stbdcurrent_changed
    label: Canvas Storyboard Changed
    category: CANVAS
    syntax: "!Event CANVAS,STBDCURRENT_CHANGED,<canvas>,<stbd>"

  - id: layout_property_changed
    label: Layout Property Changed
    category: LAYOUT
    syntax: "!Event LAYOUT,PROPERTY_CHANGED,<layout>,<property>,<value>"
    description: "FrameRate, Lock changes."

  - id: outputs_sync_property_changed
    label: Output Sync Changed
    category: OUTPUTS_SYNC
    syntax: "!Event OUTPUTS_SYNC,PROPERTY_CHANGED,<property>,<value>"
    description: "LockMode, LockSource, LockStatus changes."

  - id: storyboard_iscurrent_changed
    label: Storyboard Status Changed
    category: STBD
    syntax: "!Event STBD,ISCURRENT_CHANGED,<stbd>,<Yes|No>"

  - id: preset_take_event
    label: Preset Recalled
    category: PRESET
    syntax: "!Event PRESET,TAKE,<id>,<canvas>,<name>"

  - id: preset_complete
    label: Preset Complete
    category: PRESET
    syntax: "!Event PRESET,COMPLETE,<id>,<canvas>,<name>"

  - id: preset_save_event
    label: Preset Saved
    category: PRESET
    syntax: "!Event PRESET,SAVE,<id>,<canvas>,<name>"

  - id: module_status_event
    label: Module Status
    category: MODULE
    syntax: '!Event MODULE,STATUS,<slot>,"<status>"'
    values: [READY, SHUTDOWN, BOOTING, UPDATING, BOOTFAILED, UPDATEFAILED, WAITFORVERSION, CARDFAILED]

  - id: module_update_transfer_progress
    label: Module Update Progress
    category: MODULE
    syntax: "!Event MODULE,UPDATE_TRANSFER_PROGRESS,<slot>,<percent>,<bytes>"

  - id: module_core_temperature_alert
    label: Module Core Temperature Alert
    category: MODULE
    syntax: "!Event MODULE,CORE_TEMPERATURE_ALERT,<slot>,<status>,<temp>"
    description: "Status: OK, RunningHot, OverTemperature. Temp in Celsius."

  - id: media_player_item_status
    label: Media Item Status Changed
    category: MEDIA_PLAYER
    syntax: "!Event MEDIA_PLAYER,ITEM_STATUS_CHANGED,<input>,<item>,<status>,<resultCode>"

  - id: media_player_status_update
    label: Media Player Status Update
    category: MEDIA_PLAYER
    syntax: "!Event MEDIA_PLAYER,STATUS_UPDATE,<input>,<state>,<index>"

  - id: media_storage_operation_done
    label: Storage Operation Complete
    category: MEDIA_STORAGE
    syntax: "!Event MEDIA_STORAGE,OPERATION_DONE,<slot>,<exitCode>"
    description: "exitCode 0 = success."

  - id: system_update_status
    label: System Update Status
    category: SYSTEM
    syntax: "!Event SYSTEM,UPDATE_STATUS,<status>"
    values: [Booting, Updating, Ready, UpdateFailed]

  - id: system_powermode_changed
    label: Power Mode Changed
    category: SYSTEM
    syntax: "!Event SYSTEM,POWERMODE_CHANGED,<status>"
    values: [Standby, Resuming, Resumed]

  - id: canvas_options_colour_range_changed
    label: Colour Range Changed
    category: CANVAS_OPTIONS
    syntax: "!Event CANVAS_OPTIONS,COLOUR_RANGE_CHANGED,<status>"
    values: [Started, Completed, Failed]
```

## Macros
```yaml
macros:
  - id: sync_multiple_output_blackout
    label: Synchronized Output Blackout
    steps:
      - command: StartBatch()
      - command: "Slot<n>.Out<n>.CutToBlack = On"
        description: "Repeat for each output"
      - command: EndBatch()
    description: "Surround multiple CutToBlack commands with batch for synchronized blanking."

  - id: change_window_input_with_event
    label: Change Window Input
    steps:
      - command: AddEvents(WINDOW)
        description: "Subscribe to window events first"
      - command: "Window1.Input = Slot3.In2"
        description: "Change the input"
    description: "After setting input, WINDOW INPUT event confirms the change."
```

## Safety
```yaml
confirmation_required_for:
  - System.Reset()
  - Device.SoftwareUpdate()
  - Device.MediaCardUpdate()
  - System.ClearSavedSettings()
  - System.RestoreBackup()
  - Resources.Images.RemoveAll()
interlocks:
  - "Only one TCP/IP API connection supported at a time."
  - "RS-232 is diagnostic only; not all commands work via serial."
  - "Media storage file operations blocked during playback."
  - "Ethernet settings changes may disconnect the active session."
```

## Notes
- Commands use dot-notation property paths for reads/writes and parenthesized syntax for methods.
- Every command returns at least `!Done <command>` or `!Failed <command>`. Properties also return the value.
- Namespace prefixes can be omitted where documented: e.g. `Window1` instead of `Routing.Windows.Window1`, `Slot1.In1` instead of `Slots.Slot1.In1`, `Stbd1` instead of `Stbds.Stbd1`.
- Short aliases exist: `s<n>i<n>` for `Slot<n>.In<n>`.
- Event subscriptions are per-connection. Categories: HDMI, WINDOW, CANVAS, LAYOUT, OUTPUTS_SYNC, STBD, PRESET, OUTPUT, MODULE, MEDIA_PLAYER, MEDIA_STORAGE, SYSTEM, SECURITY, CANVAS_OPTIONS, STATUS_GROUP, MODULE_CORE_TEMPERATURE.
- Preset namespace is deprecated; use Storyboards (Stbds) instead.
- Streaming media module operating modes: Standard, Sync_1x8 (synchronized 8x 1080p30 playback).
- Custom resolutions numbered 1000-1009; system resolutions 1-999 are read-only.
- Default admin credentials: admin/adminpw (should be changed in production).
<!-- UNRESOLVED: RS-232 data_bits, parity, stop_bits, flow_control not stated -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: exact set of module card types that ship with each chassis variant not fully enumerated -->

## Provenance

```yaml
source_domains:
  - api.tvone.com
retrieved_at: 2026-04-30T19:35:53.603Z
last_checked_at: 2026-05-01T00:09:24.904Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-01T00:09:24.904Z
matched_actions: 72
action_count: 72
confidence: high
summary: "All 72 spec actions matched literally to source; transport parameters (port 10001, baud 115200) verified; full bidirectional coverage achieved."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
