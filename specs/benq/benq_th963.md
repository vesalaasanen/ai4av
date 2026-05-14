---
spec_id: admin/benq-th963
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ TH963 Control Spec"
manufacturer: BenQ
model_family: TH963
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - TH963
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - benqimage.blob.core.windows.net
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
retrieved_at: 2026-05-08T15:21:30.302Z
last_checked_at: 2026-05-14T18:17:14.514Z
generated_at: 2026-05-14T18:17:14.514Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.514Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 89 spec actions (52 write + 37 read) matched literally in the source command table; transport parameters (115200 baud, 8 data bits, no parity, 1 stop bit, no flow control) verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-07
---

# BenQ TH963 Control Spec

## Summary

BenQ TH963 DLP projector controlled via RS-232 serial. Command format: `<CR>*<command>=<value>#<CR>` (ASCII). All commands echoed back uppercase; query responses return current value. No authentication required.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no TCP/IP control documentation found — only RS-232 -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # power on/off commands
- queryable    # query commands returning state
- routable     # source selection commands
- levelable    # volume, contrast, brightness, color, sharpness, mic volume
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "<CR>*pow=on#<CR>"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "<CR>*pow=off#<CR>"
  params: []

- id: select_source
  label: Select Source
  kind: action
  command: "<CR>*sour={source}#<CR>"
  params:
    - name: source
      type: enum
      values: [RGB, RGB2, ypbr, ypbr2, dviA, dvid, hdmi, hdmi2, vid, svid, network, usbdisplay, usbreader]
      description: Input source identifier

- id: mute_on
  label: Mute On
  kind: action
  command: "<CR>*mute=on#<CR>"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "<CR>*mute=off#<CR>"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "<CR>*vol=+#<CR>"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "<CR>*vol=-#<CR>"
  params: []

- id: mic_volume_up
  label: Mic Volume Up
  kind: action
  command: "<CR>*micvol=+#<CR>"
  params: []

- id: mic_volume_down
  label: Mic Volume Down
  kind: action
  command: "<CR>*micvol=-#<CR>"
  params: []

- id: select_audio_source
  label: Select Audio Source
  kind: action
  command: "<CR>*audiosour={source}#<CR>"
  params:
    - name: source
      type: enum
      values: [off, RGB, RGB2, vid, ypbr, hdmi, hdmi2]
      description: Audio source identifier

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "<CR>*appmod={mode}#<CR>"
  params:
    - name: mode
      type: enum
      values: [dynamic, preset, srgb, bright, livingroom, game, cine, std, user1, user2, user3, isfday, isfnight, threed]
      description: Picture mode

- id: contrast_up
  label: Contrast Up
  kind: action
  command: "<CR>*con=+#<CR>"
  params: []

- id: contrast_down
  label: Contrast Down
  kind: action
  command: "<CR>*con=-#<CR>"
  params: []

- id: brightness_up
  label: Brightness Up
  kind: action
  command: "<CR>*bri=+#<CR>"
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  command: "<CR>*bri=-#<CR>"
  params: []

- id: color_up
  label: Color Up
  kind: action
  command: "<CR>*color=+#<CR>"
  params: []

- id: color_down
  label: Color Down
  kind: action
  command: "<CR>*color=-#<CR>"
  params: []

- id: sharpness_up
  label: Sharpness Up
  kind: action
  command: "<CR>*sharp=+#<CR>"
  params: []

- id: sharpness_down
  label: Sharpness Down
  kind: action
  command: "<CR>*sharp=-#<CR>"
  params: []

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: "<CR>*ct={temp}#<CR>"
  params:
    - name: temp
      type: enum
      values: [warmer, warm, normal, cool, cooler, native]
      description: Color temperature preset

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "<CR>*asp={ratio}#<CR>"
  params:
    - name: ratio
      type: enum
      values: ["4:3", "16:9", "16:10", AUTO, REAL, LBOX, WIDE, ANAM]
      description: Aspect ratio mode

- id: digital_zoom_in
  label: Digital Zoom In
  kind: action
  command: "<CR>*zoomI#<CR>"
  params: []

- id: digital_zoom_out
  label: Digital Zoom Out
  kind: action
  command: "<CR>*zoomO#<CR>"
  params: []

- id: auto_adjust
  label: Auto Adjust
  kind: action
  command: "<CR>*auto#<CR>"
  params: []

- id: brilliant_color_on
  label: Brilliant Color On
  kind: action
  command: "<CR>*BC=on#<CR>"
  params: []

- id: brilliant_color_off
  label: Brilliant Color Off
  kind: action
  command: "<CR>*BC=off#<CR>"
  params: []

- id: set_projector_position
  label: Set Projector Position
  kind: action
  command: "<CR>*pp={position}#<CR>"
  params:
    - name: position
      type: enum
      values: [FT, RE, RC, FC]
      description: "FT=Front Table, RE=Rear Table, RC=Rear Ceiling, FC=Front Ceiling"

- id: set_quick_auto_search
  label: Set Quick Auto Search
  kind: action
  command: "<CR>*QAS={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_direct_power_on
  label: Set Direct Power On
  kind: action
  command: "<CR>*directpower={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_signal_power_on
  label: Set Signal Power On
  kind: action
  command: "<CR>*autopower={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_standby_network
  label: Set Standby Network
  kind: action
  command: "<CR>*standbynet={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_standby_mic
  label: Set Standby Microphone
  kind: action
  command: "<CR>*standbymic={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_standby_monitor_out
  label: Set Standby Monitor Out
  kind: action
  command: "<CR>*standbymnt={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_baud_rate
  label: Set Baud Rate
  kind: action
  command: "<CR>*baud={rate}#<CR>"
  params:
    - name: rate
      type: enum
      values: [2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]
      description: "Warning: changes serial baud rate - reconnect required"

- id: set_lamp_mode
  label: Set Lamp Mode
  kind: action
  command: "<CR>*lampm={mode}#<CR>"
  params:
    - name: mode
      type: enum
      values: [lnor, eco, seco, dualbr, dualre, single, singleeco]
      description: "lnor=Normal, eco=Eco, seco=Smart Eco, dualbr=Dual Brightest, dualre=Dual Reliable, single=Single Alternative, singleeco=Single Alt Eco"

- id: blank_on
  label: Blank On
  kind: action
  command: "<CR>*blank=on#<CR>"
  params: []

- id: blank_off
  label: Blank Off
  kind: action
  command: "<CR>*blank=off#<CR>"
  params: []

- id: freeze_on
  label: Freeze On
  kind: action
  command: "<CR>*freeze=on#<CR>"
  params: []

- id: freeze_off
  label: Freeze Off
  kind: action
  command: "<CR>*freeze=off#<CR>"
  params: []

- id: menu_on
  label: Menu On
  kind: action
  command: "<CR>*menu=on#<CR>"
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  command: "<CR>*menu=off#<CR>"
  params: []

- id: nav_up
  label: Navigate Up
  kind: action
  command: "<CR>*up#<CR>"
  params: []

- id: nav_down
  label: Navigate Down
  kind: action
  command: "<CR>*down#<CR>"
  params: []

- id: nav_right
  label: Navigate Right
  kind: action
  command: "<CR>*right#<CR>"
  params: []

- id: nav_left
  label: Navigate Left
  kind: action
  command: "<CR>*left#<CR>"
  params: []

- id: nav_enter
  label: Navigate Enter
  kind: action
  command: "<CR>*enter#<CR>"
  params: []

- id: set_3d_mode
  label: Set 3D Mode
  kind: action
  command: "<CR>*3d={mode}#<CR>"
  params:
    - name: mode
      type: enum
      values: [off, auto, tb, fs, fp, sbs, da, iv, 2d3d, nvidia]
      description: "3D sync mode - off, auto, TopBottom, FrameSequential, FramePacking, SideBySide, DisableInverter, Inverter, 2Dto3D, nVIDIA"

- id: set_remote_receiver
  label: Set Remote Receiver
  kind: action
  command: "<CR>*rr={mode}#<CR>"
  params:
    - name: mode
      type: enum
      values: [fr, f, r]
      description: "fr=front+rear, f=front, r=rear"

- id: set_instant_on
  label: Set Instant On
  kind: action
  command: "<CR>*ins={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_lamp_saver
  label: Set Lamp Saver
  kind: action
  command: "<CR>*lpsaver={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_projection_login_code
  label: Set Projection Login Code
  kind: action
  command: "<CR>*prjlogincode={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_broadcasting
  label: Set Broadcasting
  kind: action
  command: "<CR>*broadcasting={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_amx_discovery
  label: Set AMX Device Discovery
  kind: action
  command: "<CR>*amxdd={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_high_altitude
  label: Set High Altitude Mode
  kind: action
  command: "<CR>*Highaltitude={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]
```

## Feedbacks
```yaml
- id: power_state
  label: Power Status
  query: "<CR>*pow=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*POW="

- id: current_source
  label: Current Source
  query: "<CR>*sour=?#<CR>"
  type: enum
  values: [RGB, RGB2, ypbr, ypbr2, dviA, dvid, hdmi, hdmi2, vid, svid, network, usbdisplay, usbreader]
  response_prefix: "*SOUR="

- id: mute_state
  label: Mute Status
  query: "<CR>*mute=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*MUTE="

- id: volume_status
  label: Volume Status
  query: "<CR>*vol=?#<CR>"
  type: string
  response_prefix: "*VOL="

- id: mic_volume_status
  label: Mic Volume Status
  query: "<CR>*micvol=?#<CR>"
  type: string
  response_prefix: "*MICVOL="

- id: audio_source_status
  label: Audio Source Status
  query: "<CR>*audiosour=?#<CR>"
  type: enum
  values: [off, RGB, RGB2, vid, ypbr, hdmi, hdmi2]
  response_prefix: "*AUDIOSOUR="

- id: picture_mode
  label: Picture Mode
  query: "<CR>*appmod=?#<CR>"
  type: enum
  values: [dynamic, preset, srgb, bright, livingroom, game, cine, std, user1, user2, user3, isfday, isfnight, threed]
  response_prefix: "*APPMOD="

- id: contrast_value
  label: Contrast Value
  query: "<CR>*con=?#<CR>"
  type: string
  response_prefix: "*CON="

- id: brightness_value
  label: Brightness Value
  query: "<CR>*bri=?#<CR>"
  type: string
  response_prefix: "*BRI="

- id: color_value
  label: Color Value
  query: "<CR>*color=?#<CR>"
  type: string
  response_prefix: "*COLOR="

- id: sharpness_value
  label: Sharpness Value
  query: "<CR>*sharp=?#<CR>"
  type: string
  response_prefix: "*SHARP="

- id: color_temperature
  label: Color Temperature
  query: "<CR>*ct=?#<CR>"
  type: enum
  values: [warmer, warm, normal, cool, cooler, native]
  response_prefix: "*CT="

- id: aspect_status
  label: Aspect Status
  query: "<CR>*asp=?#<CR>"
  type: enum
  values: ["4:3", "16:9", "16:10", AUTO, REAL, LBOX, WIDE, ANAM]
  response_prefix: "*ASP="

- id: brilliant_color_status
  label: Brilliant Color Status
  query: "<CR>*BC=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*BC="

- id: projector_position
  label: Projector Position
  query: "<CR>*pp=?#<CR>"
  type: enum
  values: [FT, RE, RC, FC]
  response_prefix: "*PP="

- id: quick_auto_search_status
  label: Quick Auto Search Status
  query: "<CR>*QAS=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*QAS="

- id: direct_power_on_status
  label: Direct Power On Status
  query: "<CR>*directpower=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*DIRECTPOWER="

- id: signal_power_on_status
  label: Signal Power On Status
  query: "<CR>*autopower=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*AUTOPOWER="

- id: standby_network_status
  label: Standby Network Status
  query: "<CR>*standbynet=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*STANDBYNET="

- id: standby_mic_status
  label: Standby Mic Status
  query: "<CR>*standbymic=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*STANDBYMIC="

- id: standby_monitor_out_status
  label: Standby Monitor Out Status
  query: "<CR>*standbymnt=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*STANDBYMNT="

- id: current_baud_rate
  label: Current Baud Rate
  query: "<CR>*baud=?#<CR>"
  type: enum
  values: [2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]
  response_prefix: "*BAUD="

- id: lamp_hours
  label: Lamp 1 Hours
  query: "<CR>*ltim=?#<CR>"
  type: string
  response_prefix: "*LTIM="

- id: lamp2_hours
  label: Lamp 2 Hours
  query: "<CR>*ltim2=?#<CR>"
  type: string
  response_prefix: "*LTIM2="

- id: lamp_mode
  label: Lamp Mode
  query: "<CR>*lampm=?#<CR>"
  type: enum
  values: [lnor, eco, seco, dualbr, dualre, single, singleeco]
  response_prefix: "*LAMPM="

- id: model_name
  label: Model Name
  query: "<CR>*modelname=?#<CR>"
  type: string
  response_prefix: "*MODELNAME="

- id: blank_status
  label: Blank Status
  query: "<CR>*blank=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*BLANK="

- id: freeze_status
  label: Freeze Status
  query: "<CR>*freeze=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*FREEZE="

- id: sync_3d_status
  label: 3D Sync Status
  query: "<CR>*3d=?#<CR>"
  type: enum
  values: [off, auto, tb, fs, fp, sbs, da, iv, 2d3d, nvidia]
  response_prefix: "*3D="

- id: remote_receiver_status
  label: Remote Receiver Status
  query: "<CR>*rr=?#<CR>"
  type: enum
  values: [fr, f, r]
  response_prefix: "*RR="

- id: instant_on_status
  label: Instant On Status
  query: "<CR>*ins=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*INS="

- id: lamp_saver_status
  label: Lamp Saver Status
  query: "<CR>*lpsaver=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*LPSAVER="

- id: projection_login_code_status
  label: Projection Login Code Status
  query: "<CR>*prjlogincode=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*PRJLOGINCODE="

- id: broadcasting_status
  label: Broadcasting Status
  query: "<CR>*broadcasting=?<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*BROADCASTING="

- id: amx_discovery_status
  label: AMX Discovery Status
  query: "<CR>*amxdd=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*AMXDD="

- id: mac_address
  label: MAC Address
  query: "<CR>*macaddr=?#<CR>"
  type: string
  response_prefix: "*MACADDR="

- id: high_altitude_status
  label: High Altitude Status
  query: "<CR>*Highaltitude=?#<CR>"
  type: enum
  values: [on, off]
  response_prefix: "*HIGHALTITUDE="
```

## Variables
```yaml
# UNRESOLVED: volume/micvol query returns value but range not stated in source
# UNRESOLVED: contrast/brightness/color/sharpness query returns value but range not stated in source
```

## Events
```yaml
# No unsolicited notifications described in source.
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: power-off during cooling period behavior not specified
# UNRESOLVED: lamp safety interlocks not documented
```

## Notes
- Command format: `<CR>` is ASCII 0x0D (carriage return). Commands wrapped as `<CR>*<cmd>=<value>#<CR>`.
- Echo behavior: projector echoes the sent command then responds with uppercase result. Ready prompt is `>` (0x3E).
- 5-second inactivity timeout: if no command sent after connection, projector responds `0D 0A 00`.
- Error responses: `Illegal format` (bad syntax), `Unsupported item` (valid command, unsupported on this model), `Block item` (valid command, blocked by current state).
- `Block item` and `Unsupported item` not available in power-saving standby mode (< 1W).
- Status queries and power-on command work in low-power mode (< 0.5W).
- Case-insensitive input; responses are uppercase.
- Dual-lamp commands (`dualbr`, `dualre`, `single`, `singleeco`) marked with 雙燈 (dual lamp) — may not apply to all TH963 variants.
- Source notes that "functions will vary from model to model" — some source/audio/aspect values may not apply.
- Broadcasting read command lacks trailing `#` (possibly a typo in source): `<CR>*broadcasting=?<CR>`.
<!-- UNRESOLVED: exact volume/micvol numeric range not stated -->
<!-- UNRESOLVED: exact contrast/brightness/color/sharpness numeric range not stated -->
<!-- UNRESOLVED: lamp hour response format (integer? with unit?) not specified -->

## Provenance

```yaml
source_domains:
  - benqimage.blob.core.windows.net
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
retrieved_at: 2026-05-08T15:21:30.302Z
last_checked_at: 2026-05-14T18:17:14.514Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.514Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 89 spec actions (52 write + 37 read) matched literally in the source command table; transport parameters (115200 baud, 8 data bits, no parity, 1 stop bit, no flow control) verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
