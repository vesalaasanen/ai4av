---
spec_id: admin/cisco-phone-menu
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco Phone Menu Control Spec"
manufacturer: Cisco
model_family: "Cisco Unified IP Phone 6800 Series (6821, 6841)"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "Cisco Unified IP Phone 6800 Series (6821, 6841)"
    - "Cisco Unified IP Phone 7800 Series (7811, 7821, 7841, 7861, 7832)"
    - "Cisco Unified IP Phone 8800 Series (8811, 8841, 8845, 8851, 8851NR, 8861, 8865, 8865NR)"
    - "Cisco Unified IP Phone 8800 Series Video (8875, 8875NR)"
    - "Cisco Unified IP Conference Phone 8831"
    - "Cisco Unified IP Conference Phone 8832"
    - "Cisco Wireless IP Phone 8821"
    - "Cisco Wireless IP Phone 840"
    - "Cisco Wireless IP Phone 860"
    - "Cisco Desk Phone 9811"
    - "Cisco Desk Phone 9841"
    - "Cisco Desk Phone 9851"
    - "Cisco Desk Phone 9861"
    - "Cisco Desk Phone 9861NR"
    - "Cisco Desk Phone 9871"
    - "Cisco Desk Phone 9871NR"
    - "Cisco Multiplatform Phone 6800 Series"
    - "Cisco Multiplatform Phone 7800 Series"
    - "Cisco Multiplatform Phone 7832"
    - "Cisco Multiplatform Phone 8800 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
  - developer.cisco.com
source_urls:
  - https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cuipph/all_models/xsi/9-1-1/CUIP_BK_P82B3B16_00_phones-services-application-development-notes.pdf
  - https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cuipph/all_models/xsi/9-1-1/CUIP_BK_P82B3B16_00_phones-services-application-development-notes.html
  - https://developer.cisco.com/site/collaboration/
retrieved_at: 2026-06-04T03:36:11.175Z
last_checked_at: 2026-06-04T06:27:07.442Z
generated_at: 2026-06-04T06:27:07.442Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - Vibrate
  - "TLS / HTTPS behavior, certificate requirements, and TCP port numbers for /CGI/Execute are not stated in source"
  - "per-model firmware compatibility ranges not stated in source"
  - "HTTP port number not stated in source"
  - "source contains no explicit safety warnings, electrical interlocks, or"
  - "HTTPS / TLS profile and HTTPS port number for /CGI/Execute are not stated in source"
  - "exact RTP/UDP source-port behavior and DTMF passthrough timing not stated in source"
  - "per-firmware introduction of new URIs other than the PhoneOS 3.1(1) note for 9800 Series"
verification:
  verdict: verified
  checked_at: 2026-06-04T06:27:07.442Z
  matched_actions: 114
  action_count: 114
  confidence: medium
  summary: "All 114 spec actions match verbatim source tokens across Key/SoftKey/Display/Init/Device/RTP/App/media/query URIs and XML objects; transport values confirmed; only Vibrate URI (8821-only) is in source but absent from spec. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-04
---

# Cisco Phone Menu Control Spec

## Summary
Control spec for Cisco Unified IP Phones via the XML/XSI Services API. The controller pushes XML objects to the phone over HTTP POST at `/CGI/Execute` (basic-auth protected) using `CiscoIPPhoneExecute` containers that wrap internal URIs (Key, SoftKey, Dial, Display, Init, Notify, App, Device, RTP, Play, SettingsMenu, Button). The phone can also GET XML display objects (Menu, Text, Input, Directory, Image, Status, IconMenu, GraphicMenu) from a server. Per-URI and per-XML-object support varies by phone model — consult the support tables in this spec before deploying to a given model.

<!-- UNRESOLVED: TLS / HTTPS behavior, certificate requirements, and TCP port numbers for /CGI/Execute are not stated in source -->
<!-- UNRESOLVED: per-model firmware compatibility ranges not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://<phone-ip>/CGI/Execute"  # target URL for HTTP POST push, per source
  port: null  # UNRESOLVED: HTTP port number not stated in source
auth:
  type: basic  # source: "server must provide basic HTTP authentication information with the POST"
  notes: "Credentials must be of a user in the global directory with a device association to the target phone. Invalid credentials yield CiscoIPPhoneError Number=4 (Authentication Error)."
limits:
  max_post_size_bytes: 40960   # "Any HTTP POST object is limited to 40 Kbytes in size"
  max_jtapi_push_bytes: 512    # "JTAPI-pushed objects are limited to a maximum size of 512 bytes"
encoding:
  form_field_name: "XML"       # case-sensitive, contains the XML object
  content_types:
    - "text/xml"
    - "text/xml;charset=ISO-8859-1"
    - "text/xml;charset=UTF-8"
    - "text/plain;charset=Shift_JIS"
    - "audio/basic"            # for audio clip responses, max 5 seconds
admin_endpoints:
  - "http://<phone-ip>/"                            # administrative pages
  - "http://<phone-ip>/CGI/Execute"                 # push target (password-protected)
  - "http://<phone-ip>/CGI/Screenshot"              # screenshot (password-protected)
  - "http://<phone-ip>/DeviceInformation"
  - "http://<phone-ip>/DeviceInformationX"
  - "http://<phone-ip>/NetworkConfiguration"
  - "http://<phone-ip>/NetworkConfigurationX"
  - "http://<phone-ip>/EthernetInformation"
  - "http://<phone-ip>/EthernetInformationX"
  - "http://<phone-ip>/PortInformation?<n>"
  - "http://<phone-ip>/PortInformationX?<n>"
  - "http://<phone-ip>/DeviceLog?<n>"
  - "http://<phone-ip>/DeviceLogX?<n>"
  - "http://<phone-ip>/StreamingStatistics?<n>"
  - "http://<phone-ip>/StreamingStatisticsX?<n>"
```

## Traits
```yaml
- queryable   # inferred from /DeviceInformation, /NetworkConfiguration, /StreamingStatistics, getDeviceCaps query examples
- levelable   # inferred from Key:VolUp / Key:VolDwn and RTP `v` volume parameter (0-100)
```

## Actions
```yaml
# ===== XML push container =====
- id: push_execute
  label: Push CiscoIPPhoneExecute
  kind: action
  command: |
    <CiscoIPPhoneExecute>
      <ExecuteItem Priority="{priority}" URL="{uri}"/>
    </CiscoIPPhoneExecute>
  params:
    - name: priority
      type: enum
      values: [0, 1, 2]
      description: "0=Execute Immediately (default), 1=Execute When Idle, 2=Execute If Idle. HTTP URLs only; internal URIs always execute immediately."
    - name: uri
      type: string
      description: "URL (HTTP) or internal URI to execute. Max 3 ExecuteItems per object; max one HTTP URL plus two URIs, or three URIs."

# ===== Display object push (server-supplied XML object types) =====
- id: object_menu
  label: CiscoIPPhoneMenu Display Object
  kind: action
  command: |
    <CiscoIPPhoneMenu>
      <Title>...</Title><Prompt>...</Prompt>
      <MenuItem><Name>...</Name><URL>...</URL></MenuItem>
    </CiscoIPPhoneMenu>
  params:
    - name: max_menu_items
      type: integer
      description: Up to 100 MenuItems per object. Name field max 64 characters.

- id: object_text
  label: CiscoIPPhoneText Display Object
  kind: action
  command: |
    <CiscoIPPhoneText>
      <Prompt>...</Prompt><Text>...</Text>
    </CiscoIPPhoneText>

- id: object_input
  label: CiscoIPPhoneInput Display Object
  kind: action
  command: |
    <CiscoIPPhoneInput>
      <Title>...</Title>
      <URL method="post">...</URL>
      <InputItem>
        <DisplayName>...</DisplayName>
        <QueryStringParam>...</QueryStringParam>
        <DefaultValue>...</DefaultValue>
        <InputFlags>...</InputFlags>
      </InputItem>
    </CiscoIPPhoneInput>
  params:
    - name: max_input_items
      type: integer
      description: Max 5 InputItems. HTTP POST method supported only on 7800, 8800, 7832, 8832.
    - name: input_flags
      type: enum
      values: [A, T, N, E, U, L, P]
      description: "A=ASCII, T=Telephone, N=Numeric, E=Equation, U=Uppercase, L=Lowercase, P=Password (modifier, e.g. 'AP')"

- id: object_directory
  label: CiscoIPPhoneDirectory Display Object
  kind: action
  command: |
    <CiscoIPPhoneDirectory>
      <Title>...</Title>
      <DirectoryEntry><Name>...</Name><Telephone>...</Telephone></DirectoryEntry>
    </CiscoIPPhoneDirectory>
  params:
    - name: max_entries
      type: integer
      description: Up to 32 DirectoryEntry objects per CiscoIPPhoneDirectory.

- id: object_image
  label: CiscoIPPhoneImage Display Object
  kind: action
  command: |
    <CiscoIPPhoneImage>
      <Title>...</Title><LocationX>...</LocationX><LocationY>...</LocationY>
      <Width>...</Width><Height>...</Height><Depth>...</Depth>
      <Data>...</Data>
    </CiscoIPPhoneImage>
  params:
    - name: depth
      type: integer
      description: "Bits per pixel; max value 2. Depth=1 is black-and-white. (0,0)=upper-left, (-1,-1)=centered."

- id: object_image_file
  label: CiscoIPPhoneImageFile Display Object
  kind: action
  command: |
    <CiscoIPPhoneImageFile>
      <Title>...</Title>
      <LocationX>...</LocationX><LocationY>...</LocationY>
      <URL>...</URL>
    </CiscoIPPhoneImageFile>
  params:
    - name: image_format
      type: string
      description: PNG image; server must serve with MIME Content-Type image/png.

- id: object_graphic_menu
  label: CiscoIPPhoneGraphicMenu Display Object
  kind: action
  command: |
    <CiscoIPPhoneGraphicMenu WindowMode="...">
      <Title>...</Title><Prompt>...</Prompt>
      <LocationX>...</LocationX><LocationY>...</LocationY>
      <Width>...</Width><Height>...</Height><Depth>...</Depth>
      <Data>...</Data>
      <MenuItem><Name>...</Name><URL>...</URL></MenuItem>
    </CiscoIPPhoneGraphicMenu>

- id: object_graphic_file_menu
  label: CiscoIPPhoneGraphicFileMenu Display Object
  kind: action
  command: |
    <CiscoIPPhoneGraphicFileMenu WindowMode="...">
      <Title>...</Title><Prompt>...</Prompt>
      <LocationX>...</LocationX><LocationY>...</LocationY>
      <URL>...</URL>
      <MenuItem>
        <Name>...</Name><URL>...</URL>
        <TouchArea X1="..." Y1="..." X2="..." Y2="..."/>
      </MenuItem>
    </CiscoIPPhoneGraphicFileMenu>

- id: object_icon_menu
  label: CiscoIPPhoneIconMenu Display Object
  kind: action
  command: |
    <CiscoIPPhoneIconMenu>
      <IconIndex>...</IconIndex>
      <Name>...</Name><URL>...</URL><Position>...</Position>
      <Index>...</Index>
      <Height>...</Height><Width>...</Width>
      <Depth>...</Depth><Data>...</Data>
    </CiscoIPPhoneIconMenu>
  params:
    - name: icon_dimensions
      type: string
      description: "Max width 16 px, max height 10 px. Max 32 MenuItem objects per CiscoIPPhoneIconMenu."

- id: object_icon_file_menu
  label: CiscoIPPhoneIconFileMenu Display Object
  kind: action
  command: |
    <CiscoIPPhoneIconFileMenu>
      <IconIndex>...</IconIndex>
      <Index>...</Index>
      <URL>...</URL>
    </CiscoIPPhoneIconFileMenu>
  params:
    - name: icon_dimensions
      type: string
      description: "Max width 18 px, max height 18 px."

- id: object_status_push
  label: CiscoIPPhoneStatus (push only)
  kind: action
  command: |
    <CiscoIPPhoneStatus>
      <Text>...</Text><Timer>...</Timer>
      <LocationX>...</LocationX><LocationY>...</LocationY>
      <Width>...</Width><Height>...</Height>
      <Depth>...</Depth><Data>...</Data>
    </CiscoIPPhoneStatus>
  params:
    - name: clear_method
      type: string
      description: "Push-only (HTTP POST). Cannot be pulled (HTTP GET). To clear, execute Init:AppStatus URI."

- id: object_status_file_push
  label: CiscoIPPhoneStatusFile (push only)
  kind: action
  command: |
    <CiscoIPPhoneStatusFile>
      <Text>...</Text><Timer>...</Timer>
      <LocationX>...</LocationX><LocationY>...</LocationY>
      <URL>...</URL>
    </CiscoIPPhoneStatusFile>

- id: object_error
  label: CiscoIPPhoneError Response Object
  kind: action
  command: '<CiscoIPPhoneError Number="x"/>'
  params:
    - name: number
      type: enum
      values: [1, 2, 3, 4]
      description: "1=Parse error (CiscoIPPhoneExecute), 2=Framing error (CiscoIPPhoneResponse), 3=Internal file error, 4=Authentication error"

# ===== Key URIs (single-named keys) =====
- id: key_applications
  label: Key - Applications
  kind: action
  command: "Key:Applications"

- id: key_appmenu
  label: Key - AppMenu
  kind: action
  command: "Key:AppMenu"

- id: key_conference
  label: Key - Conference
  kind: action
  command: "Key:Conference"

- id: key_contacts
  label: Key - Contacts
  kind: action
  command: "Key:Contacts"

- id: key_directories
  label: Key - Directories
  kind: action
  command: "Key:Directories"

- id: key_feature
  label: Key - Feature[1-120]
  kind: action
  command: "Key:Feature{n}"
  params:
    - name: n
      type: integer
      description: 1 to 120

- id: key_fixed_feature
  label: Key - FixedFeature[1-3]
  kind: action
  command: "Key:FixedFeature{n}"
  params:
    - name: n
      type: integer
      description: "1 to 3. On Desk 9800 with PhoneOS 3.1(1)+: FixedFeature1=Transfer, FixedFeature2=Conference, FixedFeature3=Hold."

- id: key_headset
  label: Key - Headset
  kind: action
  command: "Key:Headset"

- id: key_hold
  label: Key - Hold
  kind: action
  command: "Key:Hold"

- id: key_info
  label: Key - Info
  kind: action
  command: "Key:Info"

- id: key_kem_page
  label: Key - KEMPage / KemPage
  kind: action
  command: "Key:KEMPage"

- id: key_keypad_digit
  label: Key - KeyPad[0-9]
  kind: action
  command: "Key:KeyPad{n}"
  params:
    - name: n
      type: integer
      description: 0 to 9

- id: key_keypad_pound
  label: Key - KeyPadPound
  kind: action
  command: "Key:KeyPadPound"

- id: key_keypad_star
  label: Key - KeyPadStar
  kind: action
  command: "Key:KeyPadStar"

- id: key_line
  label: Key - Line[1-120]
  kind: action
  command: "Key:Line{n}"
  params:
    - name: n
      type: integer
      description: 1 to 120

- id: key_messages
  label: Key - Messages
  kind: action
  command: "Key:Messages"

- id: key_mute
  label: Key - Mute
  kind: action
  command: "Key:Mute"

- id: key_nav_back
  label: Key - NavBack
  kind: action
  command: "Key:NavBack"

- id: key_nav_dwn
  label: Key - NavDwn (NavDown)
  kind: action
  command: "Key:NavDwn"

- id: key_nav_left
  label: Key - NavLeft
  kind: action
  command: "Key:NavLeft"

- id: key_nav_right
  label: Key - NavRight
  kind: action
  command: "Key:NavRight"

- id: key_nav_select
  label: Key - NavSelect
  kind: action
  command: "Key:NavSelect"

- id: key_nav_up
  label: Key - NavUp
  kind: action
  command: "Key:NavUp"

- id: key_nav_offhook
  label: Key - NavOffhook
  kind: action
  command: "Key:NavOffhook"

- id: key_nav_onhook
  label: Key - NavOnhook
  kind: action
  command: "Key:NavOnhook"

- id: key_offhook
  label: Key - Offhook
  kind: action
  command: "Key:Offhook"

- id: key_onhook
  label: Key - Onhook
  kind: action
  command: "Key:Onhook"

- id: key_ptt
  label: Key - PTT (Push-to-Talk)
  kind: action
  command: "Key:PTT"

- id: key_release
  label: Key - Release
  kind: action
  command: "Key:Release"

- id: key_services
  label: Key - Services
  kind: action
  command: "Key:Services"

- id: key_session
  label: Key - Session[1-6]
  kind: action
  command: "Key:Session{n}"
  params:
    - name: n
      type: integer
      description: 1 to 6

- id: key_settings
  label: Key - Settings
  kind: action
  command: "Key:Settings"

- id: key_soft
  label: Key - Soft[1-5]
  kind: action
  command: "Key:Soft{n}"
  params:
    - name: n
      type: integer
      description: "1 to 5 (8800 Series); 1 to 4 (most phones); 1 to 2 (8821 Wireless)"

- id: key_speaker
  label: Key - Speaker
  kind: action
  command: "Key:Speaker"

- id: key_transfer
  label: Key - Transfer
  kind: action
  command: "Key:Transfer"

- id: key_vol_down
  label: Key - VolDown / VolDwn
  kind: action
  command: "Key:VolDwn"

- id: key_vol_up
  label: Key - VolUp
  kind: action
  command: "Key:VolUp"

# ===== SoftKey URIs =====
- id: softkey_back
  label: SoftKey - Back
  kind: action
  command: "SoftKey:Back"

- id: softkey_cancel
  label: SoftKey - Cancel
  kind: action
  command: "SoftKey:Cancel"

- id: softkey_exit
  label: SoftKey - Exit
  kind: action
  command: "SoftKey:Exit"

- id: softkey_next
  label: SoftKey - Next
  kind: action
  command: "SoftKey:Next"

- id: softkey_search
  label: SoftKey - Search
  kind: action
  command: "SoftKey:Search"

- id: softkey_select
  label: SoftKey - Select
  kind: action
  command: "SoftKey:Select"

- id: softkey_submit
  label: SoftKey - Submit
  kind: action
  command: "SoftKey:Submit"

- id: softkey_update
  label: SoftKey - Update
  kind: action
  command: "SoftKey:Update"

- id: softkey_dial
  label: SoftKey - Dial (Directory objects only)
  kind: action
  command: "SoftKey:Dial"

- id: softkey_editdial
  label: SoftKey - EditDial (Directory objects only)
  kind: action
  command: "SoftKey:EditDial"

- id: softkey_backspace
  label: SoftKey - << (backspace)
  kind: action
  command: "SoftKey:<<"

# ===== Display URIs =====
- id: display_off
  label: Display Off (timed)
  kind: action
  command: "Display:Off:{interval}"
  params:
    - name: interval
      type: integer
      description: "Minutes (0-1440). 0 = indefinite. e.g. Display:Off:60 turns display off 1 hour; Display:Off:0 until activated."

- id: display_on
  label: Display On (timed)
  kind: action
  command: "Display:On:{interval}"
  params:
    - name: interval
      type: integer
      description: "Minutes (0-1440). e.g. Display:On:10 for 10 minutes."

- id: display_default
  label: Display - Default
  kind: action
  command: "Display:Default"

# ===== Init URIs =====
- id: init_call_history
  label: Init - CallHistory (clear Missed/Received/Placed logs)
  kind: action
  command: "Init:CallHistory"

- id: init_services
  label: Init - Services (close Services app)
  kind: action
  command: "Init:Services"

- id: init_messages
  label: Init - Messages (close Messages app)
  kind: action
  command: "Init:Messages"

- id: init_directories
  label: Init - Directories (close Directories app)
  kind: action
  command: "Init:Directories"

- id: init_app_status
  label: Init - AppStatus (clear CiscoIPPhoneStatus)
  kind: action
  command: "Init:AppStatus"

# ===== Device URIs =====
- id: device_unlock
  label: Device - Unlock
  kind: action
  command: "Device:Unlock"

- id: device_generate_prt
  label: Device - GeneratePRT (8821 only)
  kind: action
  command: "Device:GeneratePRT"

- id: device_prt_status
  label: Device - PRTStatus (8821 only)
  kind: query
  command: "Device:PRTStatus"

# ===== Telephony URIs =====
- id: dial
  label: Dial sequence
  kind: action
  command: "Dial:{dialSequence}:{useAppUI}:{applicationId}:{audibleFeedback}"
  params:
    - name: dialSequence
      type: string
      description: "DTMF digits 0-9#*ABCD and comma (1s pause). No max length."
    - name: useAppUI
      type: boolean
      description: "0 or 1. Default 0. (8800 Series only)"
    - name: applicationId
      type: string
      description: "Format Company/Product, max length not stated. No semicolons. (7900/8800/8900/9900)"
    - name: audibleFeedback
      type: boolean
      description: "0 or 1. Default 1. (8800 Series only)"

- id: edit_dial
  label: EditDial
  kind: action
  command: "EditDial:{n}"
  params:
    - name: n
      type: string
      description: Number to dial (e.g. EditDial:1000)

- id: send_digits
  label: SendDigits (in-call DTMF)
  kind: action
  command: "SendDigits:{dtmfSequence}:{audibleFeedback}::{applicationId}"
  params:
    - name: dtmfSequence
      type: string
      description: "0-9#*ABCD and comma. Comma = 1s pause."
    - name: audibleFeedback
      type: boolean
      description: 0 or 1
    - name: applicationId
      type: string
      description: 0-64 chars, no colons

# ===== Multimedia URIs =====
- id: play_audio
  label: Play raw audio file
  kind: action
  command: "Play:{filename}"
  params:
    - name: filename
      type: string
      description: "Raw audio file in TFTP path (e.g. Play:Classic2.raw). Requirements: raw PCM no header, 8000 sps, 8 bps, uLaw, max 16080 samples, min 240 samples, sample count divisible by 240, ring starts/ends at zero crossing."

- id: rtp_rx_start
  label: RTP Receive - start (unicast)
  kind: action
  command: "RTPRx:{i}:{p}:{v}:{s}"
  params:
    - name: i
      type: string
      description: Source IP address
    - name: p
      type: integer
      description: UDP port - even, 20480-32768
    - name: v
      type: integer
      description: "Optional volume 0-100 (percent of max)"
    - name: s
      type: enum
      values: [0, 1, 2]
      description: "0=speakerphone (default if absent), 1=handset/headset, 2=current path. XSI audio path only."

- id: rtp_rx_stop
  label: RTP Receive - stop
  kind: action
  command: "RTPRx:Stop"

- id: rtp_tx_start
  label: RTP Transmit - start (unicast)
  kind: action
  command: "RTPTx:{i}:{p}"
  params:
    - name: i
      type: string
      description: Destination IP address
    - name: p
      type: integer
      description: UDP port - even, 20480-32768

- id: rtp_tx_stop
  label: RTP Transmit - stop
  kind: action
  command: "RTPTx:Stop"

- id: rtp_mrx
  label: RTP Multicast Receive
  kind: action
  command: "RTPMRx:{i}:{p}:{v}:{s}"
  params:
    - name: i
      type: string
      description: Multicast IP address
    - name: p
      type: integer
      description: Multicast UDP port - even, 20480-32768
    - name: v
      type: integer
      description: "Optional volume 0-100"
    - name: s
      type: enum
      values: [0, 1, 2]
      description: "XSI audio path: 0=speaker, 1=handset/headset, 2=current"

- id: rtp_mtx
  label: RTP Multicast Transmit
  kind: action
  command: "RTPMTx:{i}:{p}"
  params:
    - name: i
      type: string
      description: Multicast destination IP
    - name: p
      type: integer
      description: Multicast UDP port - even, 20480-32768

- id: start_media
  label: Start Media stream (XML POST)
  kind: action
  command: |
    HTTP POST /CGI/Execute
    <startMedia>
      <mediaStream onStopped="{notifyURI}" receiveVolume="{volume}">
        <type>{audio|video}</type>
        <codec>{G.711|G.729|G.722}</codec>
        <mode>{sendReceive|...}</mode>
        <address>{ip}</address>
        <port>{port}</port>
      </mediaStream>
    </startMedia>
  params:
    - name: codec
      type: enum
      values: ["G.711", "G.729", "G.722"]
      description: Only these codecs supported

- id: stop_media
  label: Stop Media stream (XML POST)
  kind: action
  command: |
    HTTP POST /CGI/Execute
    <stopMedia>
      <mediaStream id="{streamId}"/>
    </stopMedia>

# ===== Application management =====
- id: app_request_focus
  label: App - RequestFocus
  kind: action
  command: "App:RequestFocus:{priority}:{idleTimer}:{applicationId}"
  params:
    - name: priority
      type: enum
      values: [0, 1, 2]
      description: "0=immediate (unavailable in App Mgmt Event Handler), 1=when user idle, 2=only if idle"
    - name: idleTimer
      type: integer
      description: 10-86400 seconds, default 60
    - name: applicationId
      type: string
      description: 1-64 chars, no colons

- id: app_release_focus
  label: App - ReleaseFocus
  kind: action
  command: "App:ReleaseFocus:{priority}:{idleTimer}:{applicationId}"

- id: app_minimize
  label: App - Minimize
  kind: action
  command: "App:Minimize:{priority}:{idleTimer}:{applicationId}"

- id: app_close
  label: App - Close
  kind: action
  command: "App:Close:{priority}:{idleTimer}:{applicationId}"

# ===== Notify URI =====
- id: notify
  label: Notify HTTP callback
  kind: action
  command: "Notify:{protocol}:{host}:{port}:{path}:{credentials}:{data}"
  params:
    - name: protocol
      type: enum
      values: [http]
      description: "Only http is supported."
    - name: host
      type: string
      description: Hostname or IP
    - name: port
      type: integer
      description: 1-65535
    - name: path
      type: string
      description: No colons or semicolons
    - name: credentials
      type: string
      description: "Optional. For HTTP: base64-encoded userid:password. Retries 3 times before failing."
    - name: data
      type: string
      description: Optional; no semicolons
  notes: "Notify URI is NOT supported inside an Execute object - only from event handlers / softkeys."

# ===== QueryStringParam =====
- id: query_string_param
  label: QueryStringParam (append to URL)
  kind: action
  command: "QueryStringParam:{data}"
  params:
    - name: data
      type: string
      description: Data appended to the corresponding URL as a query string

# ===== Settings Menu URIs (Cisco Video Phone 8875 / 8875NR on CUCM only) =====
- id: settings_menu_open
  label: SettingsMenu - Open submenu
  kind: action
  command: "SettingsMenu:{menuname}"
  params:
    - name: menuname
      type: string
      description: "Examples: Bluetooth, About this device, Network settings, Alternate TFTP, TFTP server1, Network connection"

- id: settings_button_back
  label: Settings Button - Back
  kind: action
  command: "Button:Back"

- id: settings_button_backspace
  label: Settings Button - Backspace
  kind: action
  command: "Button:Backspace"

- id: settings_button_apply
  label: Settings Button - Apply/Submit
  kind: action
  command: "Button:Apply"

- id: settings_key_digit
  label: Settings Key - Key_[0-9]
  kind: action
  command: "Key:Key_{n}"
  params:
    - name: n
      type: integer
      description: 0 to 9

- id: settings_key_asterisk
  label: Settings Key - Key_Asterisk
  kind: action
  command: "Key:Key_Asterisk"

- id: settings_key_period
  label: Settings Key - Key_Period
  kind: action
  command: "Key:Key_Period"

- id: settings_key_number_sign
  label: Settings Key - Key_NumberSign
  kind: action
  command: "Key:Key_NumberSign"

# ===== Resource URIs (icon names usable inside CiscoIPPhoneIconFileMenu URL) =====
- id: resource_icon
  label: Resource - Built-in icon reference
  kind: action
  command: "Resource:{iconName}"
  params:
    - name: iconName
      type: enum
      values:
        - Icon.Connected
        - Icon.AuthenticatedCall
        - Icon.SecureCall
        - Icon.OnHook
        - Icon.OffHook
        - Icon.Messages
        - Icon.InUse
        - Icon.Headset
        - Icon.Handset
        - Icon.Speaker
        - Icon.Locked
        - Icon.UnLocked
        - Icon.Checked
        - Icon.UnChecked
        - Icon.RadioButtonOn
        - Icon.RadioButtonOff
        - AnimatedIcon.Ringin
        - AnimatedIcon.Hold
        - AnimatedIcon.MessageWaiting
        - AnimatedIcon.StreamingRx
        - AnimatedIcon.StreamingTx
        - AnimatedIcon.StreamRxTx
        - AnimatedIcon.Throbber

# ===== Device capability query (CTI / HTTP POST) =====
- id: get_device_caps
  label: getDeviceCaps query
  kind: query
  command: "<getDeviceCaps/>"
  params:
    - name: transport
      type: string
      description: "Over SCCP, SIP+RemoteCC UserData tunnel, or HTTP POST. Invalid object yields CiscoIPPhoneError Number=1."

# ===== Device information / admin queries (HTTP GET) =====
- id: query_device_information
  label: Query - Device Information (HTML)
  kind: query
  command: "GET /DeviceInformation"

- id: query_device_information_xml
  label: Query - Device Information (XML)
  kind: query
  command: "GET /DeviceInformationX"

- id: query_network_configuration
  label: Query - Network Configuration (HTML)
  kind: query
  command: "GET /NetworkConfiguration"

- id: query_network_configuration_xml
  label: Query - Network Configuration (XML)
  kind: query
  command: "GET /NetworkConfigurationX"

- id: query_ethernet_information
  label: Query - Ethernet Information (HTML)
  kind: query
  command: "GET /EthernetInformation"

- id: query_ethernet_information_xml
  label: Query - Ethernet Information (XML)
  kind: query
  command: "GET /EthernetInformationX"

- id: query_port_information
  label: Query - Port Information (HTML)
  kind: query
  command: "GET /PortInformation?{n}"
  params:
    - name: n
      type: integer
      description: Model-specific Ethernet port ID, typically 1-3

- id: query_port_information_xml
  label: Query - Port Information (XML)
  kind: query
  command: "GET /PortInformationX?{n}"
  params:
    - name: n
      type: integer
      description: Model-specific Ethernet port ID, typically 1-3

- id: query_device_log
  label: Query - Device Log (HTML)
  kind: query
  command: "GET /DeviceLog?{n}"
  params:
    - name: n
      type: integer
      description: Model-specific log number, typically 0-2

- id: query_device_log_xml
  label: Query - Device Log (XML)
  kind: query
  command: "GET /DeviceLogX?{n}"
  params:
    - name: n
      type: integer
      description: Model-specific log number, typically 0-2

- id: query_streaming_statistics
  label: Query - Streaming Statistics (HTML)
  kind: query
  command: "GET /StreamingStatistics?{n}"
  params:
    - name: n
      type: integer
      description: Model-specific RTP stream ID, typically 1-3

- id: query_streaming_statistics_xml
  label: Query - Streaming Statistics (XML)
  kind: query
  command: "GET /StreamingStatisticsX?{n}"
  params:
    - name: n
      type: integer
      description: Model-specific RTP stream ID, typically 1-3

- id: get_screenshot
  label: Get phone screenshot
  kind: query
  command: "GET /CGI/Screenshot"
  params:
    - name: auth
      type: string
      description: Password-protected CGI script
```

## Feedbacks
```yaml
- id: phone_response
  type: structured
  description: Successful execution result
  shape: |
    <CiscoIPPhoneResponse>
      <ResponseItem Status="0" Data="Success" URL="<URI executed>"/>
    </CiscoIPPhoneResponse>
  notes: "Cisco IP Phone 6800/7800/8800 Multiplatform Phones do NOT support CiscoIPPhoneResponse."

- id: phone_error_response
  type: enum
  description: Error response code from CiscoIPPhoneError
  values:
    - 1   # Error parsing CiscoIPPhoneExecute object
    - 2   # Error framing CiscoIPPhoneResponse object
    - 3   # Internal file error
    - 4   # Authentication error

- id: device_uri_response
  type: structured
  description: Device URI status & data
  shape: |
    Status field values: 0=Success ("Success"), 1=Parse error ("Invalid URI"), 6=Internal error ("URI not found")

- id: send_digits_response
  type: structured
  description: SendDigits URI result
  shape: |
    Status values: 0=Success, 1=Parse error ("Invalid URI"), 6=Internal error with Data in {"URI not found","No Active Call","No Active Call for Application","<Failure>"}

- id: app_uri_response
  type: structured
  description: App URI result
  shape: |
    Status values: 0=Success, 1=Parse error ("Invalid URI"), 6=Internal error with Data in {"Unknown Application ID","Application is not Active"}

- id: generate_prt_response
  type: enum
  description: Device:GeneratePRT outcome (8821)
  values:
    - 0   # Success
    - 6   # Pending PRT (request failed because there is pending problem report)

- id: prt_status_response
  type: enum
  description: Device:PRTStatus polling outcome (8821)
  values:
    - generating         # Status=0, Data="Generating PRT"
    - generated          # Status=0, Data="Generated PRT at https://<ip>/FS/prt-yyyymmdd-hhmmss-xxxxxxxxxxxx.tar.gz"
    - no_pending         # Status=6, Data="There is no pending PRT invoked from XSI"

- id: media_started
  type: structured
  description: startMedia response
  shape: '<mediaStream id="abc123"/>'

- id: media_stopped_by_user
  type: structured
  description: Unsolicited POST when user terminates audio path
  shape: |
    HTTP POST /server/path/page
    DATA=<notifyMediaEvent type="stopped" origin="user">
      <mediaStream id="abc123"/>
    </notifyMediaEvent>

- id: rtp_error_response
  type: enum
  description: RTP Streaming API errors
  values:
    - InvalidURL
    - InvalidResource
    - InvalidResourceID
    - UnavailableResource
    - InvalidXML

- id: phone_display_error_messages
  type: enum
  description: Prompt-line error messages shown on phone display
  values:
    - "XML Error[4] = XML Parser error (Invalid Object)"
    - "XML Error[5] = Unsupported XML Object"
    - "HTTP Error[8] = Unknown HTTP Error"
    - "HTTP Error[10] = HTTP Connection Failed"
    - "Services Unavailable"          # 6900 Series
    - "Host Not Found"
    - "Server Busy!"
    - "Connection failed"
    - "XML Error [4]: Parse Error"
    - "Data too large!"
    - "No services configured"
    - "Filename too long!"
    - "File Not Found"
    - "HTTP connection failed"
    - "Unknown Error"

- id: client_capability_headers
  type: structured
  description: HTTP request headers sent by the phone
  shape: |
    x-CiscoIPPhoneModelName: <e.g. CP-7861, CP-8875, CP-8845, DP-9841>
    x-CiscoIPPhoneDisplay: <width>, <height>, <bitDepth>, <C|G>
    x-CiscoIPPhoneSDKVersion: <major.minor.maintenance>
    Accept: x-CiscoIPPhone/<object>;version=<x.y.z>
    Accept-Language: <e.g. en-US>
    Accept-Charset: <e.g. utf-8,iso-8859-1;q=0.8>

- id: get_device_caps_response
  type: structured
  description: getDeviceCaps query response
  shape: |
    <getDeviceCapsResponse>
      <physical>
        <modelNumber>CP-7970</modelNumber>
        <display width="298" height="168" bitDepth="12" isColor="true"/>
      </physical>
      <services sdkVersion="5.0.3"><browser>...</browser></services>
    </getDeviceCapsResponse>
```

## Variables
```yaml
- id: refresh_url
  type: string
  description: "HTTP Refresh header - refresh time in seconds plus URL. Time=0 sets manual refresh. If URL omitted, current URL is reused."

- id: content_type
  type: enum
  values: ["text/xml", "audio/basic", "text/plain"]
  description: MIME type from HTTP ContentType header

- id: expires
  type: string
  description: "Expiration Date/Time in GMT. 8800 Series requires post-1970/1/1."

- id: cookie_session
  type: string
  description: "Set-Cookie header support; 4 cookies/host/session, 8 sessions max, 255 bytes/cookie, ~30 min idle timeout."

- id: device_name_substitution
  type: string
  description: "Service URLs accept #DEVICENAME# token; replaced with SEP-prefixed MAC, e.g. SEP000123456789"
```

## Events
```yaml
- id: app_focus_lost
  trigger: onAppFocusLost
  payload: '<notifyApplicationEvent appId="<appId>" type="focusLost"/>'

- id: app_focus_gained
  trigger: onAppFocusGained
  payload: '<notifyApplicationEvent appId="<appId>" type="focusGained"/>'

- id: app_minimized
  trigger: onAppMinimized
  payload: '<notifyApplicationEvent appId="<appId>" type="minimized"/>'

- id: app_closed
  trigger: onAppClosed
  payload: '<notifyApplicationEvent appId="<appId>" type="closed"/>'
  notes: "onAppClosed handler cannot contain HTTP or HTTPS URLs."

- id: media_stopped_event
  trigger: notifyMediaEvent type=stopped
  payload: |
    DATA=<notifyMediaEvent type="stopped" origin="user">
      <mediaStream id="<id>"/>
    </notifyMediaEvent>
```

## Macros
```yaml
- id: generate_problem_report
  label: Generate Problem Report (8821 only)
  steps:
    - push: '<ExecuteItem Priority="0" URL="Device:GeneratePRT"/>'
    - wait_for: 'Status=0 ("Success") or Status=6 ("There is pending PRT")'
    - poll: '<CiscoIPPhoneExecute><ExecuteItem Priority="0" URL="Device:PRTStatus"/></CiscoIPPhoneExecute>'
    - until: 'Data="Generated PRT at https://<ip>/FS/prt-yyyymmdd-hhmmss-xxxxxxxxxxxx.tar.gz"'

- id: set_tftp_server_address_8875
  label: Set TFTP server1 address on Cisco Video Phone 8875 (e.g. 1.0.0.7.34.1)
  steps:
    - push: 'URL="Key:Applications"'
    - push: 'URL="SettingsMenu:Networkconnection"'
    - push: 'URL="SettingsMenu:Networksettings"'
    - push: 'URL="SettingsMenu:AlternateTFTP"'
    - push: 'URL="SettingsMenu:TFTPserver1"'
    - push: 'URL="Key:Key_1"'
    - push: 'URL="Key:Key_Period"'
    - push: 'URL="Key:Key_0"'
    - push: 'URL="Key:Key_0"'
    - push: 'URL="Key:Key_Period"'
    - push: 'URL="Key:Key_7"'
    - push: 'URL="Key:Key_Period"'
    - push: 'URL="Key:Key_3"'
    - push: 'URL="Key:Key_4"'
    - push: 'URL="Key:Key_Period"'
    - push: 'URL="Key:Key_1"'
    - push: 'URL="Button:Apply"'
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, electrical interlocks, or
# power-on sequencing requirements. The protocol does emphasize that Notify URI is
# NOT supported inside the Execute object and that onAppClosed cannot contain HTTP/HTTPS,
# but these are protocol constraints rather than safety interlocks.
```

## Notes
- All `CiscoIPPhone*` element names and attribute names are case-sensitive.
- Mandatory XML escape sequences: `&`→`&amp;`, `"`→`&quot;`, `'`→`&apos;`, `<`→`&lt;`, `>`→`&gt;`.
- `<URLDown>` (softkey PRESS event) can only carry internal URIs — never an HTTP URL.
- `CiscoIPPhoneExecute` is limited to 3 ExecuteItems: one HTTP URL + two URIs, or three URIs.
- HTTP POST objects max 40 KB; JTAPI-pushed objects max 512 bytes.
- `CiscoIPPhoneStatus` is push-only — clear via `Init:AppStatus`.
- RTP UDP ports must be EVEN, in decimal range 20480-32768.
- RTP codec G.711 µ-law, packet size 20 ms (for legacy RTP URI path); G.711/G.722/G.729 for startMedia.
- Audio Play files: raw PCM 8000 sps, 8 bps, µ-law, ring size 240-16080 samples (divisible by 240), zero-crossing endpoints.
- Service URL `#DEVICENAME#` substitution token expands to SEP-prefixed MAC (e.g. `SEP000123456789`).
- Per-model XML object and URI support varies significantly — see in-source support tables. The Multiplatform Phones (6800/7800/7832/8800) do NOT support CiscoIPPhoneResponse, CiscoIPPhoneError, Display, Notify, SendDigits, Application, QueryStringParam, Unicast/Multicast RTP. The 8821 Wireless adds Vibrate, Offhook, Onhook, PTT keys exclusive to it.
- Init/Settings/Button URIs for the 8875 SettingsMenu drive a touch UI; ordering matters (Key:Applications must precede SettingsMenu URIs).

<!-- UNRESOLVED: HTTPS / TLS profile and HTTPS port number for /CGI/Execute are not stated in source -->
<!-- UNRESOLVED: exact RTP/UDP source-port behavior and DTMF passthrough timing not stated in source -->
<!-- UNRESOLVED: per-firmware introduction of new URIs other than the PhoneOS 3.1(1) note for 9800 Series -->

## Provenance

```yaml
source_domains:
  - cisco.com
  - developer.cisco.com
source_urls:
  - https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cuipph/all_models/xsi/9-1-1/CUIP_BK_P82B3B16_00_phones-services-application-development-notes.pdf
  - https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cuipph/all_models/xsi/9-1-1/CUIP_BK_P82B3B16_00_phones-services-application-development-notes.html
  - https://developer.cisco.com/site/collaboration/
retrieved_at: 2026-06-04T03:36:11.175Z
last_checked_at: 2026-06-04T06:27:07.442Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:27:07.442Z
matched_actions: 114
action_count: 114
confidence: medium
summary: "All 114 spec actions match verbatim source tokens across Key/SoftKey/Display/Init/Device/RTP/App/media/query URIs and XML objects; transport values confirmed; only Vibrate URI (8821-only) is in source but absent from spec. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- Vibrate
- "TLS / HTTPS behavior, certificate requirements, and TCP port numbers for /CGI/Execute are not stated in source"
- "per-model firmware compatibility ranges not stated in source"
- "HTTP port number not stated in source"
- "source contains no explicit safety warnings, electrical interlocks, or"
- "HTTPS / TLS profile and HTTPS port number for /CGI/Execute are not stated in source"
- "exact RTP/UDP source-port behavior and DTMF passthrough timing not stated in source"
- "per-firmware introduction of new URIs other than the PhoneOS 3.1(1) note for 9800 Series"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
