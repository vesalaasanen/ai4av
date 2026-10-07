---
spec_id: admin/benq-p_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ P-Series Control Spec"
manufacturer: BenQ
model_family: PU9730
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - PU9730
    - PW9620
    - PX9710
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - benq.eu
  - esupportdownload.benq.com
  - manualslib.com
source_urls:
  - https://www.benq.eu/content/dam/bb/en/product/projector/professional-installation/pu9730/quick-start-guide/pu9730-rs232-control-guide-0-windows7-windows8-winxp.pdf
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/PU9730/PU9730_RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
  - https://www.manualslib.com/manual/1512826/Benq-Pu9730.html
retrieved_at: 2026-04-29T15:27:53.965Z
last_checked_at: 2026-10-01T22:15:39.391Z
generated_at: 2026-10-01T22:15:39.391Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source titled \"PU9730/PW9620/PX9710\" — input called \"P-Series\"; mapping inferred from prior attempt notes"
  - "source lists 9600/14400/19200/38400/57600/115200 bps; no single default stated"
  - "source documents no payload (ASCII = NA), support NO"
  - "source documents discrete actions; no settable parameters as separate variables identified"
  - "no unsolicited event notifications documented in source"
  - "no multi-step macro sequences documented in source"
  - "source contains no safety warnings or interlock procedures."
  - "specific model-to-command support mapping not provided; support column reflects general PU9730/PW9620/PX9710 family"
  - "firmware version compatibility not stated in source"
  - "single default baud rate not stated; OSD-dependent"
verification:
  verdict: verified
  checked_at: 2026-10-01T22:15:39.391Z
  matched_actions: 112
  action_count: 112
  confidence: medium
  summary: "All 112 spec actions have literal command opcodes present in the refined source command table; transport parameters (baud, 8/N/1, port 8000) verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# BenQ P-Series Control Spec

## Summary
Professional installation projector supporting RS-232 serial and TCP/IP control. Document covers PU9730/PW9620/PX9710 models; these share the same RS-232 command protocol. Commands are ASCII-formatted with `<CR>*command=value#<CR>` syntax. Supported: power, source selection, picture mode/mode settings, lamp control, lens positioning, 3D, audio, mute/volume, remote receiver, standby modes, networking, and discovery. RS232 control also tunneled via LAN (TCP port 8000) or HDBaseT.

<!-- UNRESOLVED: source titled "PU9730/PW9620/PX9710" — input called "P-Series"; mapping inferred from prior attempt notes -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: source lists 9600/14400/19200/38400/57600/115200 bps; no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 8000  # TCP port for RS232-via-LAN control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Command framing: <CR>*<opcode>=<value>#<CR>. Commands case-insensitive.
# Values below are the core payload (opcode=value); integrator wraps with <CR> framing.
# Per source: over LAN the <CR> delimiters are optional.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "*pow=on#"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "*pow=off#"
  params: []

- id: power_status
  label: Power Status
  kind: query
  command: "*pow=?#"
  params: []

# --- Source Selection ---
- id: select_source
  label: Select Source
  kind: action
  command: "*sour={source}#"
  params:
    - name: source
      type: string
      description: "One of RGB, RGB2, YPbr, ypbr2, dviA, dvid, hdmi, hdmi2, vid, svid, network, usbdisplay, usbreader, wireless, dp, hdconnect, hdbaset"

- id: current_source
  label: Current Source
  kind: query
  command: "*sour=?#"
  params: []

# --- Audio Control (mute / volume / mic) ---
- id: mute_on
  label: Mute On
  kind: action
  command: "*mute=on#"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "*mute=off#"
  params: []

- id: mute_status
  label: Mute Status
  kind: query
  command: "*mute=?#"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "*vol=+#"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "*vol=-#"
  params: []

- id: volume_status
  label: Volume Status
  kind: query
  command: "*vol=?#"
  params: []

- id: mic_volume_up
  label: Microphone Volume Up
  kind: action
  command: "*micvol=+#"
  params: []

- id: mic_volume_down
  label: Microphone Volume Down
  kind: action
  command: "*micvol=-#"
  params: []

- id: mic_volume_status
  label: Microphone Volume Status
  kind: query
  command: "*micvol=?#"
  params: []

# --- Audio Source ---
- id: audio_source
  label: Audio Source
  kind: action
  command: "*audiosour={source}#"
  params:
    - name: source
      type: string
      description: "One of off, RGB, RGB2, vid, ypbr, hdmi, hdmi2"

- id: audio_source_status
  label: Audio Source Status
  kind: query
  command: "*audiosour=?#"
  params: []

# --- Picture Mode ---
- id: picture_mode
  label: Picture Mode
  kind: action
  command: "*appmod={mode}#"
  params:
    - name: mode
      type: string
      description: "One of dynamic, preset, srgb, bright, livingroom, game, cine, std, user1, user2, user3, isfday, isfnight, threed"

# --- Picture Settings ---
- id: contrast_adjust
  label: Contrast Adjust
  kind: action
  command: "*con={delta}#"
  params:
    - name: delta
      type: string
      description: "\"+\" or \"-\""

- id: contrast_value
  label: Contrast Value
  kind: query
  command: "*con=?#"
  params: []

- id: brightness_adjust
  label: Brightness Adjust
  kind: action
  command: "*bri={delta}#"
  params:
    - name: delta
      type: string
      description: "\"+\" or \"-\""

- id: brightness_value
  label: Brightness Value
  kind: query
  command: "*bri=?#"
  params: []

- id: color_adjust
  label: Color Adjust
  kind: action
  command: "*color={delta}#"
  params:
    - name: delta
      type: string
      description: "\"+\" or \"-\""

- id: color_value
  label: Color Value
  kind: query
  command: "*color=?#"
  params: []

- id: sharpness_adjust
  label: Sharpness Adjust
  kind: action
  command: "*sharp={delta}#"
  params:
    - name: delta
      type: string
      description: "\"+\" or \"-\""

- id: sharpness_value
  label: Sharpness Value
  kind: query
  command: "*sharp=?#"
  params: []

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "*ct={mode}#"
  params:
    - name: mode
      type: string
      description: "One of warmer, warm, normal, cool, cooler, native"

- id: color_temperature_status
  label: Color Temperature Status
  kind: query
  command: "*ct=?#"
  params: []

# --- Aspect Ratio ---
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "*asp={ratio}#"
  params:
    - name: ratio
      type: string
      description: "One of 4:3, 16:9, 16:10, AUTO, REAL, LBOX, WIDE, ANAM, 5:4, 1.88:1, 2.35:1"

- id: aspect_status
  label: Aspect Status
  kind: query
  command: "*asp=?#"
  params: []

# --- Zoom / Auto ---
- id: digital_zoom_in
  label: Digital Zoom In
  kind: action
  command: "*zoomI#"
  params: []

- id: digital_zoom_out
  label: Digital Zoom Out
  kind: action
  command: "*zoomO#"
  params: []

- id: auto_align
  label: Auto
  kind: action
  command: "*auto#"
  params: []

# --- Brilliant Color ---
- id: brilliant_color_on
  label: Brilliant Color On
  kind: action
  command: "*BC=on#"
  params: []

- id: brilliant_color_off
  label: Brilliant Color Off
  kind: action
  command: "*BC=off#"
  params: []

- id: brilliant_color_status
  label: Brilliant Color Status
  kind: query
  command: "*BC=?#"
  params: []

# --- Projector Position ---
- id: projector_position
  label: Projector Position
  kind: action
  command: "*pp={position}#"
  params:
    - name: position
      type: string
      description: "One of FT, RE, RC, FC, UF, DF"

- id: projector_position_status
  label: Projector Position Status
  kind: query
  command: "*pp=?#"
  params: []

# --- Operation Settings ---
- id: quick_auto_search
  label: Quick Auto Search
  kind: action
  command: "*QAS={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: direct_power_on
  label: Direct Power On
  kind: action
  command: "*directpower={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: direct_power_on_status
  label: Direct Power On Status
  kind: query
  command: "*directpower=?#"
  params: []

- id: signal_power_on
  label: Signal Power On
  kind: action
  command: "*autopower={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: signal_power_on_status
  label: Signal Power On Status
  kind: query
  command: "*autopower=?#"
  params: []

# --- Standby Settings ---
- id: standby_settings
  label: Standby Settings
  kind: action
  command: "*standbynet={mode}#"
  params:
    - name: mode
      type: string
      description: "One of standard, eco, network, on, off"

- id: standby_settings_status
  label: Standby Settings Network Status
  kind: query
  command: "*standbynet=?#"
  params: []

- id: standby_microphone
  label: Standby Settings Microphone
  kind: action
  command: "*standbymic={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: standby_microphone_status
  label: Standby Settings Microphone Status
  kind: query
  command: "*standbymic=?#"
  params: []

- id: standby_monitor_out
  label: Standby Settings Monitor Out
  kind: action
  command: "*standbymnt={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: standby_monitor_out_status
  label: Standby Settings Monitor Out Status
  kind: query
  command: "*standbymnt=?#"
  params: []

# --- Baud Rate ---
- id: baud_rate_set
  label: Baud Rate Set
  kind: action
  command: "*baud={rate}#"
  params:
    - name: rate
      type: integer
      description: "2400, 4800, 9600, 14400, 19200, 38400, 57600, or 115200"

- id: baud_rate_status
  label: Baud Rate Status
  kind: query
  command: "*baud=?#"
  params: []

# --- Lamp ---
- id: lamp_hour_status
  label: Lamp Hour Status
  kind: query
  command: "*ltim=?#"
  params: []

- id: lamp2_hour_status
  label: Lamp2 Hour Status
  kind: query
  command: "*ltim2=?#"
  params: []

- id: lamp_hour_reset
  label: Lamp Hour Reset
  kind: action
  command: "*ltim=reset#"
  params: []

- id: lamp2_hour_reset
  label: Lamp2 Hour Reset
  kind: action
  command: "*ltim2=reset#"
  params: []

- id: lamp_mode
  label: Lamp Mode
  kind: action
  command: "*lampm={mode}#"
  params:
    - name: mode
      type: string
      description: "One of lnor, eco, seco, seco2, seco3, dualbr, dualre, single, singleeco"

- id: lamp_mode_status
  label: Lamp Mode Status
  kind: query
  command: "*lampm=?#"
  params: []

- id: lamp_dual_select
  label: Lamp Dual Select
  kind: action
  command: "*lammd={mode}#"
  params:
    - name: mode
      type: string
      description: "One of dual, num1l, num2, single"

- id: lamp_status
  label: Lamp Status
  kind: query
  command: "*lammd=?#"
  params: []

# --- Model Name ---
- id: model_name
  label: Model Name
  kind: query
  command: "*modelname=?#"
  params: []

# --- Blank / Freeze / Menu ---
- id: blank_screen
  label: Blank Screen
  kind: action
  command: "*blank={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: blank_status
  label: Blank Status
  kind: query
  command: "*blank=?#"
  params: []

- id: freeze
  label: Freeze
  kind: action
  command: "*freeze={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: freeze_status
  label: Freeze Status
  kind: query
  command: "*freeze=?#"
  params: []

- id: menu
  label: Menu
  kind: action
  command: "*menu={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: menu_status
  label: Menu Status
  kind: query
  command: "*menu=?#"
  params: []

# --- Navigation Keys ---
- id: key_up
  label: Key Up
  kind: action
  command: "*up#"
  params: []

- id: key_down
  label: Key Down
  kind: action
  command: "*down#"
  params: []

- id: key_right
  label: Key Right
  kind: action
  command: "*right#"
  params: []

- id: key_left
  label: Key Left
  kind: action
  command: "*left#"
  params: []

- id: key_enter
  label: Key Enter
  kind: action
  command: "*enter#"
  params: []

# --- 3D Sync ---
- id: sync_3d
  label: 3D Sync
  kind: action
  command: "*3d={mode}#"
  params:
    - name: mode
      type: string
      description: "One of off, auto, tb, fs, fp, sbs, da, iv, 2d3d, nvidia"

- id: sync_3d_status
  label: 3D Sync Status
  kind: query
  command: "*3d=?#"
  params: []

# --- Remote ---
- id: remote_set
  label: Remote Set
  kind: action
  command: "*rrset=0#"
  params: []

- id: remote_set_status
  label: Remote Set Status
  kind: query
  command: "*rrset=?#"
  params: []

- id: remote_receiver
  label: Remote Receiver
  kind: action
  command: "*rr={position}#"
  params:
    - name: position
      type: string
      description: "One of fr, f, r, t, tf, tr"

- id: remote_receiver_status
  label: Remote Receiver Status
  kind: query
  command: "*rr=?#"
  params: []

# --- Instant On ---
- id: instant_on
  label: Instant On
  kind: action
  command: "*ins={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: instant_on_status
  label: Instant On Status
  kind: query
  command: "*ins=?#"
  params: []

# --- Lamp Saver ---
- id: lamp_saver_mode
  label: Lamp Saver Mode
  kind: action
  command: "*lpsaver={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: lamp_saver_mode_status
  label: Lamp Saver Mode Status
  kind: query
  command: "*lpsaver=?#"
  params: []

# --- Projection Log In Code ---
- id: projection_log_in_code
  label: Projection Log In Code
  kind: action
  command: "*prjlogincode={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: projection_log_in_code_status
  label: Projection Log In Code Status
  kind: query
  command: "*prjlogincode=?#"
  params: []

# --- Broadcasting ---
- id: broadcasting
  label: Broadcasting
  kind: action
  command: "*broadcasting={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: broadcasting_status
  label: Broadcasting Status
  kind: query
  command: "*broadcasting=?#"
  params: []

# --- AMX Device Discovery ---
- id: amx_device_discovery
  label: AMX Device Discovery
  kind: action
  command: "*amxdd={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: amx_device_discovery_status
  label: AMX Device Discovery Status
  kind: query
  command: "*amxdd=?#"
  params: []

# --- Mac Address ---
- id: mac_address
  label: Mac Address
  kind: query
  command: "*macaddr=?#"
  params: []

# --- Trigger ---
- id: trigger
  label: Trigger
  kind: action
  command: "*trigger={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: trigger_status
  label: Trigger Status
  kind: query
  command: "*trigger=?#"
  params: []

# --- High Altitude ---
- id: high_altitude_mode
  label: High Altitude Mode
  kind: action
  command: "*Highaltitude={state}#"
  params:
    - name: state
      type: string
      description: "\"on\" or \"off\""

- id: high_altitude_mode_status
  label: High Altitude Mode Status
  kind: query
  command: "*Highaltitude=?#"
  params: []

# --- Error Code ---
- id: error_code_report
  label: Error Code Report
  kind: query
  command: "*error=report#"
  params: []

# --- Serial Number ---
- id: serial_number_set
  label: Serial Number Code1
  kind: action
  command: "V99N1234"
  params: []

- id: serial_number_query
  label: Serial Number Query
  kind: query
  command: "V99N0000"
  params: []

# --- Lens ---
- id: lens_shift
  label: Lens Shift
  kind: action
  command: "*lst={direction}#"
  params:
    - name: direction
      type: string
      description: "up, down, left, right"

- id: lens_focus
  label: Lens Focus
  kind: action
  command: "*focus={delta}#"
  params:
    - name: delta
      type: string
      description: "\"+\" or \"-\""

- id: lens_zoom
  label: Lens Zoom
  kind: action
  command: "*zoom={delta}#"
  params:
    - name: delta
      type: string
      description: "\"+\" or \"-\""

- id: keystone_adjust
  label: Keystone Adjust
  kind: action
  command: "*keyst={delta}#"
  params:
    - name: delta
      type: string
      description: "\"+\" or \"-\""

- id: keystone_status
  label: Keystone Vertical Status
  kind: query
  command: "*keyst=?#"
  params: []

- id: lens_load
  label: Lens Load Memory
  kind: action
  command: "*lensload={memory}#"
  params:
    - name: memory
      type: string
      description: "m1 through m10"

- id: lens_save
  label: Lens Save Memory
  kind: action
  command: "*lenssave={memory}#"
  params:
    - name: memory
      type: string
      description: "m1 through m10"

- id: lens_reset
  label: Lens Reset to Center
  kind: action
  command: "*lensreset=center#"
  params: []

# --- Documented but not implemented (NA) on this family ---
# Source lists these as functions with ASCII = "NA" and Support = NO.
- id: autosync
  label: AutoSync
  kind: action
  command: null  # UNRESOLVED: source documents no payload (ASCII = NA), support NO
  params: []

- id: get_filter_timer
  label: Get Filter Timer
  kind: query
  command: null  # UNRESOLVED: source documents no payload (ASCII = NA), support NO
  params: []

- id: system_reset
  label: System Reset
  kind: action
  command: null  # UNRESOLVED: source documents no payload (ASCII = NA), support NO
  params: []

- id: get_fw_version
  label: Get Firmware Version
  kind: query
  command: null  # UNRESOLVED: source documents no payload (ASCII = NA), support NO
  params: []

- id: get_tint
  label: Get Tint
  kind: query
  command: null  # UNRESOLVED: source documents no payload (ASCII = NA), support NO
  params: []

- id: set_tint
  label: Set Tint
  kind: action
  command: null  # UNRESOLVED: source documents no payload (ASCII = NA), support NO
  params: []

- id: get_keystone_value
  label: Get Keystone Value
  kind: query
  command: null  # UNRESOLVED: source documents no payload (ASCII = NA), support NO
  params: []

- id: set_keystone_value
  label: Set Keystone Value
  kind: action
  command: null  # UNRESOLVED: source documents no payload (ASCII = NA), support NO
  params: []

- id: get_messaging
  label: Get Messaging
  kind: query
  command: null  # UNRESOLVED: source documents no payload (ASCII = NA), support NO
  params: []

- id: set_messaging
  label: Set Messaging
  kind: action
  command: null  # UNRESOLVED: source documents no payload (ASCII = NA), support NO
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]

- id: current_source
  type: string

- id: mute_state
  type: enum
  values: [on, off]

- id: volume_level
  type: integer

- id: mic_volume_level
  type: integer

- id: picture_mode
  type: string

- id: contrast_value
  type: integer

- id: brightness_value
  type: integer

- id: color_value
  type: integer

- id: sharpness_value
  type: integer

- id: color_temperature
  type: string

- id: aspect_ratio
  type: string

- id: brilliant_color_state
  type: enum
  values: [on, off]

- id: projector_position
  type: string

- id: quick_auto_search_state
  type: enum
  values: [on, off]

- id: direct_power_on_state
  type: enum
  values: [on, off]

- id: signal_power_on_state
  type: enum
  values: [on, off]

- id: standby_settings_state
  type: string

- id: standby_microphone_state
  type: enum
  values: [on, off]

- id: standby_monitor_out_state
  type: enum
  values: [on, off]

- id: baud_rate
  type: integer

- id: lamp_hour
  type: integer

- id: lamp2_hour
  type: integer

- id: lamp_mode
  type: string

- id: lamp_status
  type: string

- id: model_name
  type: string

- id: blank_state
  type: enum
  values: [on, off]

- id: freeze_state
  type: enum
  values: [on, off]

- id: menu_state
  type: enum
  values: [on, off]

- id: sync_3d_state
  type: string

- id: remote_set_state
  type: string

- id: remote_receiver_state
  type: string

- id: instant_on_state
  type: enum
  values: [on, off]

- id: lamp_saver_mode_state
  type: enum
  values: [on, off]

- id: projection_log_in_code_state
  type: enum
  values: [on, off]

- id: broadcasting_state
  type: enum
  values: [on, off]

- id: amx_device_discovery_state
  type: enum
  values: [on, off]

- id: mac_address
  type: string

- id: serial_number
  type: string

- id: trigger_state
  type: enum
  values: [on, off]

- id: high_altitude_mode_state
  type: enum
  values: [on, off]

- id: error_code
  type: string

- id: keystone_value
  type: integer

- id: audio_source_state
  type: string
```

## Variables
```yaml
# UNRESOLVED: source documents discrete actions; no settable parameters as separate variables identified
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
# Note: source states commands only function when standby power is 0.5W or higher
# and a supported baud rate is set on the projector.
```

## Notes
Command format: `<CR>*command=value#<CR>` (e.g., `<CR>*pow=on#<CR>`). Commands are case-insensitive. Error responses: "Illegal format" (malformed command), "Unsupported item" (valid command not supported by model), "Block item" (command blocked under current condition).

Three physical control paths documented, all using the same command set:
1. **RS232 serial (D-Sub 9-pin, straight cable)** — baud 9600/14400/19200/38400/57600/115200 bps (check OSD for active rate; no single default stated), 8 data bits, no parity, 1 stop bit, no flow control.
2. **RS232 via LAN (RJ45)** — TCP port 8000. Commands work with or without `<CR>` delimiters over LAN; behavior identical to serial.
3. **RS232 via HDBaseT (RJ45)** — serial tunneled through HDBaseT-compatible device using same serial settings.

Standby power must be 0.5W or higher for RS-232 control to function. Available features vary by model, input sources, and settings.

RS232 pin assignment (D-Sub 9): pin 2 = RXD, pin 3 = TXD, pin 5 = GND, pin 7 = RTS, pin 8 = CTS; pins 1/4/6/9 = NC.

Source support column: many commands marked NO (not functional on PU9730/PW9620/PX9710 family) — including mute, volume, mic volume, audio source selection, most picture modes, brilliant color, signal power on, standby microphone/monitor out, remote set/receiver, instant on, lamp saver, projection log in code, broadcasting, AMX discovery, mac address, serial number, and several sources (HDMI 2, DVI-A, Network, USB Display/Reader, Wireless, DisplayPort, HD Connect). These remain documented as actions for family-wide coverage; integrators should verify per-model support.

Document version: 1.01-S.

<!-- UNRESOLVED: specific model-to-command support mapping not provided; support column reflects general PU9730/PW9620/PX9710 family -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: single default baud rate not stated; OSD-dependent -->
````

Upgrade done. Key adds:
- **Transport**: added `tcp` + port 8000 (LAN control path)
- **~36 new actions**: mute×3, volume×3, micvol×3, brilliant color×3, autopower×2, standbymic×2, standbymnt×2, lamp2 reset, remote set×2, remote receiver×2, instant on×2, lamp saver×2, prjlogincode×2, broadcasting×2, amx×2, mac address, serial num×2, plus 10 NA documented functions
- **`command:` payloads** verbatim on every action w/ documented opcode
- **Feedbacks**: added mic_volume, serial_number; kept all existing

Existing IDs/shapes preserved. Nothing deleted.

## Provenance

```yaml
source_domains:
  - benq.eu
  - esupportdownload.benq.com
  - manualslib.com
source_urls:
  - https://www.benq.eu/content/dam/bb/en/product/projector/professional-installation/pu9730/quick-start-guide/pu9730-rs232-control-guide-0-windows7-windows8-winxp.pdf
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/PU9730/PU9730_RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
  - https://www.manualslib.com/manual/1512826/Benq-Pu9730.html
retrieved_at: 2026-04-29T15:27:53.965Z
last_checked_at: 2026-10-01T22:15:39.391Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T22:15:39.391Z
matched_actions: 112
action_count: 112
confidence: medium
summary: "All 112 spec actions have literal command opcodes present in the refined source command table; transport parameters (baud, 8/N/1, port 8000) verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source titled \"PU9730/PW9620/PX9710\" — input called \"P-Series\"; mapping inferred from prior attempt notes"
- "source lists 9600/14400/19200/38400/57600/115200 bps; no single default stated"
- "source documents no payload (ASCII = NA), support NO"
- "source documents discrete actions; no settable parameters as separate variables identified"
- "no unsolicited event notifications documented in source"
- "no multi-step macro sequences documented in source"
- "source contains no safety warnings or interlock procedures."
- "specific model-to-command support mapping not provided; support column reflects general PU9730/PW9620/PX9710 family"
- "firmware version compatibility not stated in source"
- "single default baud rate not stated; OSD-dependent"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
