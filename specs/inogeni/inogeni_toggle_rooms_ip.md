---
spec_id: admin/inogeni-toggle-rooms
schema_version: ai4av-public-spec-v1
revision: 1
title: "INOGENI TOGGLE ROOMS Control Spec"
manufacturer: INOGENI
model_family: "TOGGLE ROOMS"
aliases: []
compatible_with:
  manufacturers:
    - INOGENI
  models:
    - "TOGGLE ROOMS"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - inogeni.com
source_urls:
  - https://inogeni.com/documents/toggle-rooms/INOGENI-TOGGLE-ROOMS_User-Guide-V1-6.pdf
  - https://inogeni.com/plugin-qsys-toggle-series/
  - https://inogeni.com/plugin-crestron-togglerooms/
retrieved_at: 2026-06-29T22:51:33.893Z
last_checked_at: 2026-06-30T07:10:06.133Z
generated_at: 2026-06-30T07:10:06.133Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device power specifications, fault behavior, firmware compatibility ranges not stated in source"
  - "persistence behavior across reboots not documented per-command."
  - "no event/notification mechanism documented in source."
  - "no macros documented in source."
  - "power-on sequencing requirements not explicitly documented in source."
  - "device electrical specifications (voltage/current/power) not in source excerpt"
  - "fault behavior and error recovery sequences not documented"
  - "firmware version compatibility ranges not stated"
  - "bearer token format/length beyond alphanumeric+0-9 not specified"
verification:
  verdict: verified
  checked_at: 2026-06-30T07:10:06.133Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions matched exactly in source with complete bidirectional coverage; all transport parameters verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# INOGENI TOGGLE ROOMS Control Spec

## Summary
The INOGENI TOGGLE ROOMS is a USB-C/HDMI conferencing room switcher that routes USB and HDMI sources between a RoomPC and a laptop, with share and display outputs. Control is provided over a unified API accessible via RS-232 serial, telnet (TCP port 23), TCP-to-RS232 tunneling (TCP port 5000), and a REST API (`https://<IP>/api/v1/`). The serial and REST interfaces share the same command set.

<!-- UNRESOLVED: device power specifications, fault behavior, firmware compatibility ranges not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
serial:
  baud_rate: 9600  # default; source also lists 19200, 38400, 115200 as configurable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  # telnet control
  telnet_port: 23
  # TCP-to-RS232 tunnel bridge
  tunnel_port: 5000
  # REST API base URL (self-signed HTTPS)
  base_url: "https://<IP>/api/v1/"
auth:
  # Source: "By default, no authentication is required to perform action using the REST API.
  # Authentication can be enabled through the embedded webpage or the REST API itself."
  type: none  # default; bearer token auth (Authorization: Bearer <token>) optionally enabled via API/config
```

## Traits
```yaml
traits:
  - routable   # inferred: USB host, display source, share source routing commands present
  - queryable  # inferred: HELP, STATUS, VERSION, and per-command RX query forms present
  - levelable  # inferred: CEC volume up/down, mute toggle present
```

## Actions
```yaml
# RS232 payload form: "<COMMAND> <ARG1> <ARG2>...<CR><LF>" (space between command and args;
# <CR><LF> terminator required). REST form: GET/POST https://<IP>/api/v1/<cmd>?<arg>=val
# TX = set (args present); RX = query (no args / first arg only). ACK<CR><LF> = success,
# NACK<CR><LF> = failure.

- id: auto_hdmi_cec_pwr
  label: Auto HDMI CEC Power
  kind: action
  command: "AUTOHDMICECPWR {enable}"  # REST: GET/POST autoHdmiCecPwr?enable=
  params:
    - name: enable
      type: integer
      description: "0=OFF, 1=ON"

- id: baudrate
  label: RS232 Baud Rate
  kind: action
  command: "BAUDRATE {baudrate}"  # REST: baudrate?baudrate=
  params:
    - name: baudrate
      type: integer
      description: "0=9600, 1=19200, 2=38400, 3=115200"

- id: btn_lock
  label: Button Lock
  kind: action
  command: "BTNLOCK {lockState}"  # REST: btnLock?btnLock=
  params:
    - name: lockState
      type: integer
      description: "0=Not locked, 1=Locked"

- id: cec_passthrough_en
  label: CEC Passthrough Enable
  kind: action
  command: "CECPASSTHROUGHEN {enable}"  # REST: cecPassthroughEn?enable=
  params:
    - name: enable
      type: integer
      description: "0=OFF, 1=ON (default)"

- id: cec_toggle_mute
  label: CEC Toggle Mute
  kind: action
  command: "CECTOGGLEMUTE"  # REST: cecToggleMute
  params: []

- id: cec_vol_down
  label: CEC Volume Down
  kind: action
  command: "CECVOLDOWN"  # REST: cecVolDown
  params: []

- id: cec_vol_up
  label: CEC Volume Up
  kind: action
  command: "CECVOLUP"  # REST: cecVolUp
  params: []

- id: display_src
  label: Display Source
  kind: action
  command: "DISPLAYSRC {src}"  # REST: displaySrc?displaySrc=
  params:
    - name: src
      type: integer
      description: "0=RoomPC, 1=Laptop USB-C, 2=Laptop HDMI, 3=OFF"

- id: display_sw_mode
  label: Display Switching Mode
  kind: action
  command: "DISPLAYSWMODE {swMode}"  # REST: displaySwMode?displaySwMode=
  params:
    - name: swMode
      type: integer
      description: "0=Automatic (default), 1=Manual, 2=Manual with fallback, 3=HDMI follows USB"

- id: edid
  label: EDID Mode
  kind: action
  command: "EDID {src} {edid}"  # REST: edid?src=&edid=
  params:
    - name: src
      type: integer
      description: "0=RoomPC, 1=Laptop USB-C, 2=Laptop HDMI"
    - name: edid
      type: integer
      description: "0=Passthrough, 1=User EDID, 2=3840x2160p60, 3=3840x2160p50, 4=3840x2160p30, 5=3840x2160p25, 6=1920x1080p60, 7=1920x1080p50, 8=1280x720p60, 9=1280x720p50, 10=5120x2160p30, 11=5120x2160p25"

- id: edid_hdmi_out
  label: EDID HDMI Out (sink report)
  kind: action
  command: "EDIDHDMIOUT {sink} {src}"  # REST: edidHdmiOut?sink=&src=
  params:
    - name: sink
      type: integer
      description: "0=Display, 1=SHARE OUT"
    - name: src
      type: integer
      description: "0=RoomPC, 1=Laptop USB-C, 2=Laptop HDMI"

- id: edid_usr
  label: User EDID
  kind: action
  command: "EDIDUSR {src} {edidUsr256bytes}"  # REST: edidUsr?src=&edidUsr=
  params:
    - name: src
      type: integer
      description: "0=RoomPC, 1=Laptop USB-C, 2=Laptop HDMI"
    - name: edidUsr
      type: string
      description: "256-byte array EDID"

- id: gpi_cfg
  label: GPI Configuration
  kind: action
  command: "GPICFG {gpi} {mode} {function}"  # REST: gpiCfg?gpi=&mode=&function=
  params:
    - name: gpi
      type: integer
      description: "1=GPI1, 2=GPI2"
    - name: mode
      type: integer
      description: "0=Pulse (default), 1=Level"
    - name: function
      type: integer
      description: "0=Disabled, 1=BYOM mode control, 2=USB host control, 3=Display video source control, 4=Share output video source control"

- id: hdcp_ctl
  label: HDCP Control
  kind: action
  command: "HDCPCTL {src} {hdcp}"  # REST: hdcpCtl?src=&hdcp=
  params:
    - name: src
      type: integer
      description: "0=RoomPC, 1=Laptop USB-C, 2=Laptop HDMI"
    - name: hdcp
      type: integer
      description: "0=Disabled, 1=HDCP v1.4, 2=HDCP v2.2, 3=Auto"

- id: help
  label: Help
  kind: query
  command: "HELP"  # REST: help
  params: []

- id: host_button
  label: Host Button Trigger
  kind: action
  command: "HOSTBUTTON"  # REST: hostButton
  params: []

- id: host_meeting
  label: Host Meeting
  kind: action
  command: "HOSTMEETING {host}"  # REST: hostMeeting?host=
  params:
    - name: host
      type: integer
      description: "0=RoomPC, 1=Laptop USB-C, 2=Laptop USB-B/HDMI"

- id: hostname
  label: Hostname
  kind: action
  command: "HOSTNAME {hostname}"  # REST: hostname?hostname=
  params:
    - name: hostname
      type: string
      description: "Hostname string, no spaces"

- id: http_en
  label: HTTP Enable
  kind: action
  command: "HTTPEN {enable}"  # REST: httpEn?enable=
  params:
    - name: enable
      type: integer
      description: "0=OFF, 1=ON"

- id: network
  label: Network Settings
  kind: action
  command: "NETWORK {mode} {ip} {netmask} {gateway}"  # REST: network?mode=&ip=&netmask=&gateway=
  params:
    - name: mode
      type: string
      description: "static or dhcp"
    - name: ip
      type: string
      description: "IP address (static mode)"
    - name: netmask
      type: string
      description: "Netmask (static mode)"
    - name: gateway
      type: string
      description: "Gateway (static mode, optional)"

- id: op_mode
  label: Operation Mode
  kind: action
  command: "OPMODE {opMode}"  # REST: opMode?opMode=
  params:
    - name: opMode
      type: integer
      description: "0=RoomPC/BYOD content sharing (default), 1=BYOM, 2=Custom"

- id: prior_display_src
  label: Display Source Priority
  kind: action
  command: "PRIORDISPLAYSRC {src}"  # REST: priorDisplaySrc?priorDisplaySrc=
  params:
    - name: src
      type: integer
      description: "0=RoomPC, 1=Laptop USB-C, 2=Laptop HDMI, 3=Last detected (default)"

- id: prior_host_meeting
  label: Host Meeting Priority
  kind: action
  command: "PRIORHOSTMEETING {host}"  # REST: priorHostMeeting?priorHostMeeting=
  params:
    - name: host
      type: integer
      description: "1=Laptop USB-C, 2=Laptop USB-B/HDMI, 3=Last detected laptop (default)"

- id: prior_share_src
  label: Share Source Priority
  kind: action
  command: "PRIORSHARESRC {src}"  # REST: priorShareSrc?priorShareSrc=
  params:
    - name: src
      type: integer
      description: "0=RoomPC, 1=Laptop USB-C, 2=Laptop HDMI, 3=Last detected (default)"

- id: prior_usb_host
  label: USB Host Priority
  kind: action
  command: "PRIORUSBHOST {host}"  # REST: priorUsbHost?priorUsbHost=
  params:
    - name: host
      type: integer
      description: "0=RoomPC, 1=Laptop USB-C, 2=Laptop USB-B, 3=Last detected host (default)"

- id: reboot
  label: Reboot
  kind: action
  command: "REBOOT"  # REST: reboot
  params: []

- id: rstr
  label: Restore Defaults
  kind: action
  command: "RSTR"  # REST: rstr
  params: []

- id: scaler
  label: Scaler
  kind: action
  command: "SCALER {output} {enable}"  # REST: scaler?output=&enable=
  params:
    - name: output
      type: integer
      description: "0=Display output, 1=Share output"
    - name: enable
      type: integer
      description: "0=OFF, 1=ON"

- id: share_src
  label: Share Source
  kind: action
  command: "SHARESRC {src}"  # REST: shareSrc?shareSrc=
  params:
    - name: src
      type: integer
      description: "0=RoomPC (not in auto mode), 1=Laptop USB-C, 2=Laptop HDMI, 3=OFF"

- id: share_sw_mode
  label: Share Switching Mode
  kind: action
  command: "SHARESWMODE {swMode}"  # REST: shareSwMode?shareSwMode=
  params:
    - name: swMode
      type: integer
      description: "0=Automatic (default), 1=Manual, 2=Manual with fallback, 3=HDMI follows USB"

- id: status
  label: Status
  kind: query
  command: "STATUS"  # REST: status
  params: []

- id: telnet_en
  label: Telnet Enable
  kind: action
  command: "TELNETEN {enable}"  # REST: telnetEn?enable=
  params:
    - name: enable
      type: integer
      description: "0=OFF (default), 1=ON"

- id: tunneling_en
  label: TCP-RS232 Tunneling Enable
  kind: action
  command: "TUNNELINGEN {enable} {baudrate} {dataBits} {stopBits} {parity}"  # REST: tunnelingEn
  params:
    - name: enable
      type: integer
      description: "0=OFF (default), 1=ON"
    - name: baudrate
      type: integer
      description: "0=9600, 1=19200, 2=38400, 3=115200"
    - name: dataBits
      type: integer
      description: "0=7, 1=8, 2=9"
    - name: stopBits
      type: integer
      description: "0=1, 1=2"
    - name: parity
      type: integer
      description: "0=none, 1=even, 2=odd"

- id: usbc_4k60_en
  label: USB-C 4K60 Mode
  kind: action
  command: "USBC4K60EN {mode}"  # REST: usbc4K60En?usbc4K60En=
  params:
    - name: mode
      type: integer
      description: "0=Disable 4K60 (default), 1=Enable 4K60 (disables USB3.0)"

- id: usb_dev_en
  label: USB Device Power Enable
  kind: action
  command: "USBDEVEN {host} {devices}"  # REST: usbDevEn?host=&devices=
  params:
    - name: host
      type: integer
      description: "0=RoomPC, 1=Laptop USB-C, 2=Laptop HDMI, 3=When no host detected"
    - name: devices
      type: integer
      description: "Bitmask (USB1|USB2<<1|USB3<<2); 0-7"

- id: usb_host
  label: USB Host
  kind: action
  command: "USBHOST {host}"  # REST: usbHost?host=
  params:
    - name: host
      type: integer
      description: "0=RoomPC, 1=Laptop USB-C, 2=Laptop USB-B, 3=OFF"

- id: usb_host_sw_mode
  label: USB Host Switching Mode
  kind: action
  command: "USBHOSTSWMODE {swMode}"  # REST: usbHostSwMode?usbHostSwMode=
  params:
    - name: swMode
      type: integer
      description: "0=Automatic (default), 1=Manual, 2=Manual with fallback, 3=USB follows HDMI"

- id: version
  label: Firmware Version
  kind: query
  command: "VERSION"  # REST: version
  params: []

- id: vout
  label: VOUT Level
  kind: action
  command: "VOUT {vout}"  # REST: vout?vout=
  params:
    - name: vout
      type: integer
      description: "0=Controlled by firmware, 1=Logic-low, 2=Logic-high"

- id: telnet_quit
  label: Telnet Quit (disconnect)
  kind: action
  command: "quit"  # telnet-only; asks server for disconnection
  params: []

# REST-only auth/token management endpoints (not part of shared RS232 API)

- id: change_password
  label: Change Password
  kind: action
  command: "POST https://<IP>/api/v1/changePassword"
  params:
    - name: oldPassword
      type: string
    - name: newPassword
      type: string

- id: get_access_token
  label: Get Access Token
  kind: query
  command: "GET https://<IP>/api/v1/accessToken"
  params: []

- id: gen_access_token
  label: Generate/Activate Access Token
  kind: action
  command: "POST https://<IP>/api/v1/accessToken"
  params: []

- id: delete_access_token
  label: Delete/Deactivate Access Token
  kind: action
  command: "DELETE https://<IP>/api/v1/accessToken"
  params: []

- id: access_token_en
  label: Access Token Enable
  kind: action
  command: "GET https://<IP>/api/v1/accessTokenEn?enable="
  params:
    - name: enable
      type: integer
      description: "1=activate, 0=deactivate"
```

## Feedbacks
```yaml
- id: ack
  type: string
  values: ["ACK"]
  description: "ACK<CR><LF> returned on command success."

- id: nack
  type: string
  values: ["NACK"]
  description: "NACK<CR><LF> returned on command failure."

- id: http_status_code
  type: enum
  values: [200, 400, 401]
  description: "200=success, 400=error, 401=authorization error."

- id: enable_response
  type: string
  description: "ENABLE=<enable> returned by AUTOHDMICECPWR?, CECPASSTHROUGHEN?, HTTPEN?, TELNETEN? RX forms."

- id: baudrate_response
  type: string
  description: "BAUDRATE=<baudrate> returned by BAUDRATE? RX form."

- id: btnlock_response
  type: string
  description: "BTNLOCK=<lockState> returned by BTNLOCK? RX form."

- id: displaysrc_response
  type: string
  description: "DISPLAYSRC=<src> returned by DISPLAYSRC? RX form."

- id: displayswmode_response
  type: string
  description: "DISPLAYSWMODE=<swMode> returned by DISPLAYSWMODE? RX form."

- id: edid_response
  type: string
  description: "EDID=<edid> returned by EDID RX form."

- id: hostname_response
  type: string
  description: "HOSTNAME=<hostname> returned by HOSTNAME? RX form."

- id: hdcp_response
  type: string
  description: "HDCP=<hdcp> returned by HDCPCTL RX form."

- id: opmode_response
  type: string
  description: "OPMODE=<opMode> returned by OPMODE? RX form."

- id: prior_displaysrc_response
  type: string
  description: "PRIORDISPLAYSRC=<src> returned by PRIORDISPLAYSRC? RX form."

- id: prior_host_meeting_response
  type: string
  description: "PRIORHOSTMEETING=<host> returned by PRIORHOSTMEETING? RX form."

- id: prior_share_src_response
  type: string
  description: "PRIORSHARESRC=<src> returned by PRIORSHARESRC? RX form."

- id: prior_usb_host_response
  type: string
  description: "PRIORUSBHOST=<host> returned by PRIORUSBHOST? RX form."

- id: sharesrc_response
  type: string
  description: "SHARESRC=<src> returned by SHARESRC? RX form."

- id: share_sw_mode_response
  type: string
  description: "SHARESWMODE=<swMode> returned by SHARESWMODE? RX form."

- id: scaler_enable_response
  type: string
  description: "ENABLE=<enable> returned by SCALER RX form."

- id: tunneling_response
  type: string
  description: "ENABLE/BAUDRATE/DATABITS/STOPBITS/PARITY lines returned by TUNNELINGEN RX form."

- id: usbhost_response
  type: string
  description: "USBHOST=<host> returned by USBHOST? RX form."

- id: usb_host_sw_mode_response
  type: string
  description: "USBHOSTSWMODE=<swMode> returned by USBHOSTSWMODE? RX form."

- id: usbc4k60en_response
  type: string
  description: "USBC4K60EN=<mode> returned by USBC4K60EN? RX form."

- id: usb_dev_response
  type: string
  description: "DEVICES=<devices> returned by USBDEVEN RX form."

- id: vout_response
  type: string
  description: "VOUT=<vout> returned by VOUT? RX form."

- id: version_response
  type: object
  description: "MAJOR=<Integer>, MINOR=<Integer> lines returned by VERSION."
```

## Variables
```yaml
# Settable parameters with continuous/enum state, tracked separate from discrete actions.
# All commands here are Get/Set; current state queryable via RX form.
# UNRESOLVED: persistence behavior across reboots not documented per-command.
```

## Events
```yaml
# Source documents no unsolicited push notifications. Device responds only to queries.
# UNRESOLVED: no event/notification mechanism documented in source.
```

## Macros
```yaml
# Source documents no explicit multi-step macro sequences.
# UNRESOLVED: no macros documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - reboot     # device reboot, will interrupt all in-progress routing
  - rstr       # factory restore, wipes password and REST API token
interlocks:
  - "Enabling TCP-to-RS232 tunneling (TUNNELINGEN 1) disables the device's own Serial communication protocol."
  - "Enabling USBC4K60 (USBC4K60EN 1) disables USB 3.0 on USB-C port; USB 2.0 remains active."
  - "EDIDHDMIOUT sets the associated source EDID mode to 'User EDID'."
# UNRESOLVED: power-on sequencing requirements not explicitly documented in source.
```

## Notes
- All RS232/telnet commands require a **space character between the command name and argument**, terminated with `<CR><LF>`.
- Success response: `ACK<CR><LF>`. Failure response: `NACK<CR><LF>`.
- REST API uses self-signed HTTPS certificates.
- RS232 terminal block pinout: Pin 1=RX, Pin 2=GND, Pin 3=TX, Pin 4=5V supply (for INOGENI Remote).
- Default RS232 config: 9600 baud, 8 data bits, 1 stop bit, no parity, no flow control.
- REST API query form (alternative to JSON body): `GET https://<IP>/api/v1/<COMMAND>?<ARG1>=value&<ARG2>=value`.
- Telnet default port: 23. TCP-to-RS232 tunnel default port: 5000.
- Web interface accessible via mDNS URL `toggle-rooms-<last3macbytes>.local` (firmware v1.25+).
- DIP switch SW6: OFF=disable 5V on terminal block, ON=enable 5V (required to power connected remote). SW1–SW5 reserved/future use.

<!-- UNRESOLVED: device electrical specifications (voltage/current/power) not in source excerpt -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: bearer token format/length beyond alphanumeric+0-9 not specified -->
```

## Provenance

```yaml
source_domains:
  - inogeni.com
source_urls:
  - https://inogeni.com/documents/toggle-rooms/INOGENI-TOGGLE-ROOMS_User-Guide-V1-6.pdf
  - https://inogeni.com/plugin-qsys-toggle-series/
  - https://inogeni.com/plugin-crestron-togglerooms/
retrieved_at: 2026-06-29T22:51:33.893Z
last_checked_at: 2026-06-30T07:10:06.133Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:10:06.133Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions matched exactly in source with complete bidirectional coverage; all transport parameters verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device power specifications, fault behavior, firmware compatibility ranges not stated in source"
- "persistence behavior across reboots not documented per-command."
- "no event/notification mechanism documented in source."
- "no macros documented in source."
- "power-on sequencing requirements not explicitly documented in source."
- "device electrical specifications (voltage/current/power) not in source excerpt"
- "fault behavior and error recovery sequences not documented"
- "firmware version compatibility ranges not stated"
- "bearer token format/length beyond alphanumeric+0-9 not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
