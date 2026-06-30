---
spec_id: admin/inogeni-toggle-dock-2x1
schema_version: ai4av-public-spec-v1
revision: 1
title: "INOGENI TOGGLE DOCK 2x1 Control Spec"
manufacturer: INOGENI
model_family: "INOGENI TOGGLE DOCK 2x1"
aliases: []
compatible_with:
  manufacturers:
    - INOGENI
  models:
    - "INOGENI TOGGLE DOCK 2x1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - inogeni.com
source_urls:
  - https://inogeni.com/toggle-dock-2x1-user-guide
  - https://inogeni.com/support/software-tools/
retrieved_at: 2026-06-29T22:55:20.427Z
last_checked_at: 2026-06-30T07:10:05.387Z
generated_at: 2026-06-30T07:10:05.387Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source."
  - "GPI/VOUT voltage levels stated electrically but no control-via-command safety interlock documented."
  - "all settable parameters are expressed as discrete actions above; no separate continuous variable set documented."
  - "no unsolicited notifications documented in source. Device responds only to requests."
  - "no multi-step sequences explicitly documented in source."
  - "source contains no explicit safety warnings, interlock procedures, or power-on"
  - "firmware version compatibility ranges not stated."
  - "exact voltage/current/power specs intentionally not populated (Tier 3)."
  - "no documented unsolicited event/notification protocol."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:10:05.387Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions verified against source table; transport parameters confirmed; comprehensive one-to-one coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# INOGENI TOGGLE DOCK 2x1 Control Spec

## Summary
INOGENI TOGGLE DOCK 2x1 is a USB-C / USB-B + HDMI KVM-style docking switcher for meeting-room laptops, routing USB host and HDMI display sources between two hosts. Control is exposed over RS-232C (4-pos terminal block), Telnet (TCP 23), a TCP↔RS232 tunnel (TCP 5000), and an HTTPS REST API (`/api/v1/`). RS232 and REST share one command API; this spec documents that shared API with RS232 payloads verbatim.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: GPI/VOUT voltage levels stated electrically but no control-via-command safety interlock documented. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 9600          # default; also 19200, 38400, 115200 selectable via BAUDRATE cmd
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  # Two TCP services exist:
  port: 23                 # Telnet - uses same serial protocol command set; "quit" disconnects
  # port 5000 = TCP↔RS232 raw tunnel (enabling it DISABLES the serial protocol API)
  base_url: "https://<IP>/api/v1/"   # REST; self-signed certificates
auth:
  type: none  # inferred: source states "By default, no authentication is required" for REST; no login for serial/telnet
  # NOTE: REST supports OPTIONAL bearer token auth (Authorization: Bearer <token>), enabled via config page or API.
```

## Traits
```yaml
traits:
  - queryable   # inferred: most commands support RX (no-arg) query returning current value
  - routable    # inferred: DISPLAYSRC / USBHOST / HOSTMEETING route USB+HDMI between hosts
  - levelable   # inferred: CECVOLUP / CECVOLDOWN / CECTOGGLEMUTE control display audio
```

## Actions
```yaml
# RS232 line format: "<MNEMONIC> <arg1> <arg2>...\r\n" (space between name and args; CR+LF terminator).
# TX = with args → applies setting. RX = no args (or first arg only) → returns current value.
# Success → "ACK\r\n", failure → "NACK\r\n". REST equivalent path shown per command.
# Each entry below = one documented API opcode/mnemonic (Get/Set dual unless noted).

- id: autohdmi_cec_pwr
  label: Auto HDMI CEC Power Control
  kind: action
  command: "AUTOHDMICECPWR {enable}<CR><LF>"
  params:
    - name: enable
      type: integer
      description: "0=OFF, 1=ON - auto CEC on/off of connected display based on routed HDMI source"
  notes: REST GET/POST /api/v1/autoHdmiCecPwr?enable=. RX (no arg) returns ENABLE=<enable>.

- id: baudrate
  label: Set RS232 Baud Rate
  kind: action
  command: "BAUDRATE {baudrate}<CR><LF>"
  params:
    - name: baudrate
      type: integer
      description: "0=9600, 1=19200, 2=38400, 3=115200"
  notes: REST /api/v1/baudrate. RX returns BAUDRATE=<baudrate>.

- id: btn_lock
  label: Front Button Lock
  kind: action
  command: "BTNLOCK {lockState}<CR><LF>"
  params:
    - name: lockState
      type: integer
      description: "0=Not locked, 1=Locked"
  notes: REST /api/v1/btnLock. RX returns BTNLOCK=<lockState>.

- id: cec_passthrough_en
  label: CEC Passthrough Enable
  kind: action
  command: "CECPASSTHROUGHEN {enable}<CR><LF>"
  params:
    - name: enable
      type: integer
      description: "0=OFF, 1=ON [default] - pass CEC from source to display"
  notes: REST /api/v1/cecPassthroughEn. RX returns ENABLE=<src>.

- id: cec_toggle_mute
  label: CEC Toggle Mute
  kind: action
  command: "CECTOGGLEMUTE<CR><LF>"
  params: []
  notes: TX-only. REST /api/v1/cecToggleMute. Toggles display mute.

- id: cec_vol_down
  label: CEC Volume Down
  kind: action
  command: "CECVOLDOWN<CR><LF>"
  params: []
  notes: TX-only. REST /api/v1/cecVolDown.

- id: cec_vol_up
  label: CEC Volume Up
  kind: action
  command: "CECVOLUP<CR><LF>"
  params: []
  notes: TX-only. REST /api/v1/cecVolUp.

- id: display_src
  label: Select HDMI Display Source
  kind: action
  command: "DISPLAYSRC {src}<CR><LF>"
  params:
    - name: src
      type: integer
      description: "1=Laptop USB-C, 2=Laptop HDMI, 3=OFF"
  notes: REST /api/v1/displaySrc. RX returns DISPLAYSRC=<src>.

- id: display_sw_mode
  label: HDMI Display Switching Mode
  kind: action
  command: "DISPLAYSWMODE {swMode}<CR><LF>"
  params:
    - name: swMode
      type: integer
      description: "0=Automatic [default], 1=Manual, 2=Manual w/ fallback, 3=HDMI follows USB"
  notes: Requires opMode=Custom. REST /api/v1/displaySwMode. RX returns DISPLAYSWMODE=<host>.

- id: edid
  label: Set EDID Mode
  kind: action
  command: "EDID {src} {edid}<CR><LF>"
  params:
    - name: src
      type: integer
      description: "1=Laptop USB-C, 2=Laptop HDMI"
    - name: edid
      type: integer
      description: "0=Passthrough,1=User EDID,2=3840x2160p60,3=2160p50,4=2160p30,5=2160p25,6=1920x1080p60,7=1080p50,8=1280x720p60,9=720p50,10=5120x2160p30,11=5120x2160p25"
  notes: REST /api/v1/edid. RX returns EDID=<edid>.

- id: edid_hdmi_out
  label: Set EDID From Sink (Report to Source)
  kind: action
  command: "EDIDHDMIOUT {sink} {src}<CR><LF>"
  params:
    - name: sink
      type: integer
      description: "0=Display"
    - name: src
      type: integer
      description: "1=Laptop USB-C, 2=Laptop HDMI"
  notes: Sets source EDID mode to "User EDID". <edidHdmiOut>=256-byte array. REST /api/v1/edidHdmiOut.

- id: edid_usr
  label: Set User EDID (Raw 256 Bytes)
  kind: action
  command: "EDIDUSR {src} {256-byte-array}<CR><LF>"
  params:
    - name: src
      type: integer
      description: "1=Laptop USB-C, 2=Laptop HDMI"
  notes: <edidUsr> = formatted 256-byte array. REST /api/v1/edidUsr.

- id: gpi_cfg
  label: GPI Configuration
  kind: action
  command: "GPICFG {gpi} {mode} {function}<CR><LF>"
  params:
    - name: gpi
      type: integer
      description: "1=GPI1, 2=GPI2"
    - name: mode
      type: integer
      description: "0=Pulse [default], 1=Level"
    - name: function
      type: integer
      description: "0=Disabled,1=Laptop select,2=USB host control,3=Display video source control"
  notes: Pulse=falling-edge trigger; Level=short/open both trigger. REST /api/v1/gpiCfg.

- id: hdcp_ctl
  label: HDCP Setting
  kind: action
  command: "HDCPCTL {src} {hdcp}<CR><LF>"
  params:
    - name: src
      type: integer
      description: "1=Laptop USB-C, 2=Laptop HDMI"
    - name: hdcp
      type: integer
      description: "0=Disabled, 1=HDCP v1.4, 2=HDCP v2.2, 3=Auto"
  notes: REST /api/v1/hdcpCtl. RX returns HDCP=<hdcp>.

- id: help
  label: Help - List Commands
  kind: query
  command: "HELP<CR><LF>"
  params: []
  notes: RX-only. REST /api/v1/help. Returns list of supported commands.

- id: host_button
  label: Emulate Front / INO-Button Press
  kind: action
  command: "HOSTBUTTON<CR><LF>"
  params: []
  notes: TX-only. Same as front button or INO-BUTTON KIT. REST /api/v1/hostButton.

- id: host_meeting
  label: Host Meeting Switch (Momentary)
  kind: action
  command: "HOSTMEETING {host}<CR><LF>"
  params:
    - name: host
      type: integer
      description: "1=Laptop USB-C, 2=Laptop USB-B/HDMI"
  notes: Momentary - preconfigured modes resume on USB/HDMI events. REST /api/v1/hostMeeting. RX returns host=<host>.

- id: hostname
  label: Device Hostname
  kind: action
  command: "HOSTNAME {hostname}<CR><LF>"
  params:
    - name: hostname
      type: string
      description: "Network + USB HID name; no space characters"
  notes: REST /api/v1/hostname. RX returns HOSTNAME=<src>.

- id: http_en
  label: HTTP (REST) Control Enable
  kind: action
  command: "HTTPEN {enable}<CR><LF>"
  params:
    - name: enable
      type: integer
      description: "0=OFF, 1=ON"
  notes: REST /api/v1/httpEn. RX returns ENABLE=<enable>.

- id: network
  label: Network Settings
  kind: action
  command: "NETWORK {mode} {ip} {netmask} {gateway}<CR><LF>"
  params:
    - name: mode
      type: string
      description: "static or dhcp"
    - name: ip
      type: string
      description: "e.g. 192.168.0.20 (required if static)"
    - name: netmask
      type: string
      description: "e.g. 255.255.0.0 (required if static)"
    - name: gateway
      type: string
      description: "e.g. 192.168.0.1 (optional)"
  notes: REST /api/v1/network. RX returns MODE/IP/NETMASK/GATEWAY lines.

- id: op_mode
  label: Operation Mode
  kind: action
  command: "OPMODE {opMode}<CR><LF>"
  params:
    - name: opMode
      type: integer
      description: "1=Auto [default], 2=Custom"
  notes: REST /api/v1/opMode. RX returns OPMODE=<src>.

- id: prior_display_src
  label: Display Source Priority
  kind: action
  command: "PRIORDISPLAYSRC {src}<CR><LF>"
  params:
    - name: src
      type: integer
      description: "1=Laptop USB-C, 2=Laptop HDMI, 3=Last detected [default]"
  notes: Applicable when opMode=Custom and displaySwMode=automatic/manual-fallback. REST /api/v1/priorDisplaySrc.

- id: prior_host_meeting
  label: Host System Priority
  kind: action
  command: "PRIORHOSTMEETING {host}<CR><LF>"
  params:
    - name: host
      type: integer
      description: "1=Laptop USB-C, 2=Laptop USB-B/HDMI, 3=Last detected [default]"
  notes: Applicable when opMode=Auto. REST /api/v1/priorHostMeeting.

- id: prior_usb_host
  label: USB Host Priority
  kind: action
  command: "PRIORUSBHOST {host}<CR><LF>"
  params:
    - name: host
      type: integer
      description: "1=Laptop USB-C, 2=Laptop USB-B, 3=Last detected [default]"
  notes: Applicable when opMode=Custom and usbHostSwMode=automatic/manual-fallback. REST /api/v1/priorUsbHost.

- id: reboot
  label: Reboot Device
  kind: action
  command: "REBOOT<CR><LF>"
  params: []
  notes: TX-only. REST /api/v1/reboot.

- id: rstr
  label: Restore Factory Defaults
  kind: action
  command: "RSTR<CR><LF>"
  params: []
  notes: Resets incl. password + REST token. REST /api/v1/rstr. Source marks RX (returns ACK).

- id: scaler
  label: HDMI Output Scaler
  kind: action
  command: "SCALER {output} {enable}<CR><LF>"
  params:
    - name: output
      type: integer
      description: "0=Display output"
    - name: enable
      type: integer
      description: "0=OFF, 1=ON"
  notes: REST /api/v1/scaler. RX returns ENABLE=<enable>.

- id: status
  label: Device Status
  kind: query
  command: "STATUS<CR><LF>"
  params: []
  notes: RX-only. Returns laptop info, display + output timings. REST /api/v1/status.

- id: telnet_en
  label: Telnet Control Enable
  kind: action
  command: "TELNETEN {enable}<CR><LF>"
  params:
    - name: enable
      type: integer
      description: "0=OFF [default], 1=ON"
  notes: REST /api/v1/telnetEn. RX returns ENABLE=<enable>.

- id: tunneling_en
  label: TCP↔RS232 Tunneling Enable (port 5000)
  kind: action
  command: "TUNNELINGEN {enable} {baudrate} {dataBits} {stopBits} {parity}<CR><LF>"
  params:
    - name: enable
      type: integer
      description: "0=OFF [default], 1=ON"
    - name: baudrate
      type: integer
      description: "0=9600,1=19200,2=38400,3=115200 (optional)"
    - name: dataBits
      type: integer
      description: "0=7,1=8,2=9 (optional)"
    - name: stopBits
      type: integer
      description: "0=1,1=2 (optional)"
    - name: parity
      type: integer
      description: "0=none,1=even,2=odd (optional)"
  notes: Enabling DISABLES device serial-protocol API (raw bridge mode). REST /api/v1/tunnelingEn.

- id: usbc_4k60_en
  label: USB-C 4K60 Mode
  kind: action
  command: "USBC4K60EN {mode}<CR><LF>"
  params:
    - name: mode
      type: integer
      description: "0=Disable 4K60 [default] (USB3.0 + 4K30), 1=Enable 4K60 (USB3.0 disabled, USB2.0 active)"
  notes: REST /api/v1/usbc4K60En. RX returns USBC4K60EN=<mode>.

- id: usb_dev_en
  label: USB Device Port Power Per Host
  kind: action
  command: "USBDEVEN {host} {devices}<CR><LF>"
  params:
    - name: host
      type: integer
      description: "1=Laptop USB-C, 2=Laptop HDMI, 3=When no host detected"
    - name: devices
      type: integer
      description: "Bitmask USB1/USB2/USB3: 0=all OFF,1=USB1,2=USB2,3=USB1+2,4=USB3,5=USB1+3,6=USB2+3,7=all ON"
  notes: REST /api/v1/usbDevEn. RX returns DEVICES=<devices>.

- id: usb_host
  label: Select USB Host
  kind: action
  command: "USBHOST {host}<CR><LF>"
  params:
    - name: host
      type: integer
      description: "1=Laptop USB-C, 2=Laptop USB-B, 3=OFF"
  notes: REST /api/v1/usbHost. RX returns USBHOST=<host>.

- id: usb_host_sw_mode
  label: USB Host Switching Mode
  kind: action
  command: "USBHOSTSWMODE {swMode}<CR><LF>"
  params:
    - name: swMode
      type: integer
      description: "0=Automatic [default],1=Manual,2=Manual w/ fallback,3=USB follows HDMI"
  notes: Requires opMode=Custom. REST /api/v1/usbHostSwMode. RX returns USBHOSTSWMODE=<host>.

- id: version
  label: Firmware Version
  kind: query
  command: "VERSION<CR><LF>"
  params: []
  notes: RX-only. Returns MAJOR=<int> MINOR=<int>. REST /api/v1/version.

- id: vout
  label: VOUT Terminal Level
  kind: action
  command: "VOUT {vout}<CR><LF>"
  params:
    - name: vout
      type: integer
      description: "0=Controlled by firmware,1=Logic-low,2=Logic-high"
  notes: Overrides default BYOM LED drive. REST /api/v1/vout. RX returns VOUT=<vout>.

# --- Transport-specific commands (not part of shared RS232/REST API above) ---

- id: telnet_quit
  label: Telnet Disconnect
  kind: action
  command: "quit"
  params: []
  notes: Telnet-only. Asks server to close the TCP connection.

- id: rest_change_password
  label: REST Change Password
  kind: action
  command: "POST https://<IP>/api/v1/changePassword"
  params:
    - name: oldPassword
      type: string
      description: current password
    - name: newPassword
      type: string
      description: new password
  notes: REST-only. Body JSON {oldPassword,newPassword}. Returns {message}.

- id: rest_access_token_get
  label: REST Get Bearer Token
  kind: query
  command: "GET https://<IP>/api/v1/accessToken"
  params: []
  notes: REST-only. Returns {token, message}. Token = alphanumeric A-Z a-z 0-9.

- id: rest_access_token_post
  label: REST Generate + Activate Bearer Auth
  kind: action
  command: "POST https://<IP>/api/v1/accessToken"
  params: []
  notes: REST-only. Generates random token, activates bearer auth for REST API.

- id: rest_access_token_delete
  label: REST Delete + Deactivate Bearer Token
  kind: action
  command: "DELETE https://<IP>/api/v1/accessToken"
  params: []
  notes: REST-only. Returns {message}.

- id: rest_access_token_en
  label: REST Enable/Disable Access Token
  kind: action
  command: "GET https://<IP>/api/v1/accessTokenEn?enable={enable}"
  params:
    - name: enable
      type: integer
      description: "1=activate, 0=deactivate"
  notes: REST-only. Returns {message}.
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values: ["ACK"]
  description: Success acknowledgement, "ACK<CR><LF>"

- id: nack
  type: enum
  values: ["NACK"]
  description: Failure acknowledgement, "NACK<CR><LF>"

- id: rest_result
  type: object
  description: REST calls return HTTP 200 (success) / 400 (error) / 401 (auth error) with JSON {message:<string>}; query endpoints additionally return the state field.
# Each Get/Set command also yields an RX response line (e.g. DISPLAYSRC=<src>, USBHOST=<host>) -
# see per-action notes. No unsolicited event stream documented.
```

## Variables
```yaml
# UNRESOLVED: all settable parameters are expressed as discrete actions above; no separate continuous variable set documented.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source. Device responds only to requests.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements. GPI supported voltage range (0-12V max) and VOUT logic levels are
# electrical specs, not command-level interlocks. REBOOT / RSTR are destructive-ish but carry
# no documented confirmation procedure.
```

## Notes
- RS232 terminal block pinout (back of device): Pin1=RX, Pin2=GND, Pin3=TX, Pin4=+5V (for INOGENI Remote). SW6 DIP must be ON to enable 5V on terminal block.
- Command syntax: space between mnemonic and argument(s); terminate every command with `<CR><LF>`.
- Shared API: RS232 and REST use the same command names (RS232 = uppercase mnemonic, REST = camelCase path under `/api/v1/`). REST also accepts args embedded in URL query string: `GET /api/v1/<cmd>?<arg>=value`.
- TCP↔RS232 tunnel (port 5000) is mutually exclusive with the serial-protocol API — enabling tunneling disables the documented command set on the serial side.
- REST uses self-signed HTTPS certificates.
- opMode=Auto vs Custom governs which switching-mode / priority commands are applicable (see per-action notes and "Operating Modes" in source).
- "USB follows HDMI" and "HDMI follows USB" cannot be set simultaneously.

<!-- UNRESOLVED: firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: exact voltage/current/power specs intentionally not populated (Tier 3). -->
<!-- UNRESOLVED: no documented unsolicited event/notification protocol. -->

## Provenance

```yaml
source_domains:
  - inogeni.com
source_urls:
  - https://inogeni.com/toggle-dock-2x1-user-guide
  - https://inogeni.com/support/software-tools/
retrieved_at: 2026-06-29T22:55:20.427Z
last_checked_at: 2026-06-30T07:10:05.387Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:10:05.387Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions verified against source table; transport parameters confirmed; comprehensive one-to-one coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source."
- "GPI/VOUT voltage levels stated electrically but no control-via-command safety interlock documented."
- "all settable parameters are expressed as discrete actions above; no separate continuous variable set documented."
- "no unsolicited notifications documented in source. Device responds only to requests."
- "no multi-step sequences explicitly documented in source."
- "source contains no explicit safety warnings, interlock procedures, or power-on"
- "firmware version compatibility ranges not stated."
- "exact voltage/current/power specs intentionally not populated (Tier 3)."
- "no documented unsolicited event/notification protocol."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
