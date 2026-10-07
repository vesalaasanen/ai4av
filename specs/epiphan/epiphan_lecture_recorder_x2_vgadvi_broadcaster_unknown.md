---
spec_id: admin/epiphan-lecture-recorder-x2-vgadvi-broadcaster
schema_version: ai4av-public-spec-v1
revision: 3
title: "Epiphan Lecture Recorder x2 3.12.0 Control Spec"
manufacturer: Epiphan
model_family: "Lecture Recorder x2"
aliases: []
compatible_with:
  manufacturers:
    - Epiphan
  models:
    - "Lecture Recorder x2"
  firmware: 3.12.0
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - epiphan.com
source_urls:
  - https://www.epiphan.com/wp-content/uploads/2015/06/epiphan-lecture-recorder-x2-userguide.pdf
retrieved_at: 2026-09-26T14:23:17.517Z
last_checked_at: 2026-09-26T14:23:17.517Z
generated_at: 2026-09-26T14:23:17.517Z
firmware_coverage: 3.12.0
protocol_coverage: []
known_gaps:
  - "omitted from this version's serial settings."
  - "default HTTP port is not stated in the cited API sections."
  - "the manual does not establish Basic versus Digest authentication."
  - "the same table incorrectly or inconsistently labels its Values cell integer; these strings follow the explicit enable/disable instructions.\""
  - "page 173 describes vbitrate=256K as 256,000, so unit scaling for bare/suffixed values is not unambiguously specified.\""
  - "libfacc conflicts with libfaac, and pcm_s161e is the literal table spelling; do not silently correct either token or treat an alternative spelling as verified.\""
  - "general channel-selection grammar; serial data bits; flow-control default; response framing and recording-time units; HTTP authentication scheme and default port; conflicting audio codec spellings and bitrate units."
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:17.517Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 command families and 67 keys match the Lecture Recorder x2 v3.12.0 guide; unresolved source grammar and conflicting values remain explicit. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-14
---

# Epiphan Lecture Recorder x2 3.12.0 Control Spec

## Summary
Control the Epiphan Lecture Recorder x2 using RS-232 or its HTTP configuration API, scoped to the manufacturer User Guide version 3.12.0 dated May 20, 2014. This draft includes nine serial command families, HTTP configuration reads and writes, the device's API-key inventory endpoint, and 67 documented configuration keys. The legacy entity/spec identifiers are retained, but compatibility is limited to Lecture Recorder x2 under this manual version; VGADVI Broadcaster compatibility is not asserted.

## Transport
```yaml
protocols:
  - serial
  - http
serial:
  baud_rate: 19200
  data_bits: null # UNRESOLVED: omitted from this version's serial settings.
  parity: none
  stop_bits: 1
  flow_control: null # Configurable Hardware (RTS/CTS), Software (XON/XOFF), or None; no default stated.
addressing:
  base_url: "http://{address}"
  # UNRESOLVED: default HTTP port is not stated in the cited API sections.
auth:
  # HTTP: use username admin and the configured password.
  # UNRESOLVED: the manual does not establish Basic versus Digest authentication.
  # Serial: no serial login procedure is documented.
```

A standard RS-232 null-modem cable and a supported USB-to-RS-232 adapter are required. Every serial command ends in LF (ASCII 10); the `\n` escape in the YAML action strings represents that byte. The static settings above and configurable flow-control choices come from pages 169-170. Select flow control to match the control terminal; no data-bit value is borrowed from a different manual revision.

HTTP commands below are method-and-target descriptions, not complete raw HTTP frames. The manual's `wget` examples use `--http-user=admin --http-passwd=<password>` for configuration requests (page 174). The source establishes credentials, not an authentication wire scheme. Default credentials and HTTP port are not asserted.

## Traits
```yaml
- queryable # Explicit parameter/status queries.
```

## Actions
```yaml
- id: start
  label: "Start recording or rotate recording file"
  kind: "action"
  command: "START\n"
  description: "Page 170, Table 28. Starts recording; if recording is already active, closes the current file and starts a new file."
  params: []
- id: stop
  label: "Stop recording"
  kind: "action"
  command: "STOP\n"
  description: "Page 170, Table 28. Stops recording."
  params: []
- id: snapshot
  label: "Capture Motion JPEG snapshot"
  kind: "action"
  command: "SNAPSHOT\n"
  description: "Page 170, Table 28. Supported only when configured for Motion JPEG. Snapshot is saved with the recording files on the device."
  params: []
- id: get_param
  label: "Read saved serial parameter"
  kind: "query"
  command: "GET.{key}\n"
  description: "Pages 170 and 172. Gets the saved parameter value. Example GET.framesize. Channel selection is not defined generally; see Notes."
  params:
    - name: key
      type: "string"
      description: "One documented configuration key from Variables."
- id: set_param
  label: "Set serial parameter before saving"
  kind: "action"
  command: "SET.{key}={value}\n"
  description: "Pages 170 and 172. SET table gives the command name; examples establish =value syntax. Follow SET changes with SAVECFG to save them. General channel grammar is unresolved; see Notes."
  params:
    - name: key
      type: "string"
      description: "One writable configuration key from Variables."
    - name: value
      type: "string"
      description: "Source-documented value. Enclose values containing spaces in double quotes; use two double quotes for an empty value. Do not use HTTP %20 encoding on the serial link."
- id: savecfg
  label: "Save serial parameter changes"
  kind: "action"
  command: "SAVECFG\n"
  description: "Page 170. Saves the parameters modified by SET."
  params: []
- id: query_status
  label: "Read each channel recording status"
  kind: "query"
  command: "STATUS\n"
  description: "Page 171. Status for each channel: RUNNING, STOPPED, or UNINITIALIZED. Per-channel response framing is not specified."
  params: []
- id: query_freespace
  label: "Read free storage bytes"
  kind: "query"
  command: "FREESPACE\n"
  description: "Page 171. Reports free storage in bytes."
  params: []
- id: query_rectime
  label: "Read elapsed recording time"
  kind: "query"
  command: "RECTIME\n"
  description: "Page 171. Reports elapsed recording time for the current file on each channel. Unit and response syntax are not given."
  params: []
- id: http_get_params
  label: "Read HTTP configuration values"
  kind: "query"
  command: "GET /admin/get_params.cgi?{keys}"
  description: "Pages 173-174. Authenticate using admin and the configured password. Query several keys by joining their names with &, for example product_name&firmware_version. HTTP authentication scheme is unresolved."
  params:
    - name: keys
      type: "string"
      description: "One documented configuration key, or multiple key names separated by ampersands. See Variables for the key inventory."
- id: http_set_params
  label: "Set HTTP configuration values"
  kind: "action"
  command: "GET /admin/set_params.cgi?{pairs}"
  description: "Pages 173-175. Authenticate using admin and the configured password. One or more key=value pairs, joined with &. Encode spaces as %20. Examples set rec_enabled=on to start recording and rec_enabled to empty to stop. The manual does not require a separate HTTP SAVECFG request."
  params:
    - name: pairs
      type: "string"
      description: "Writable key=value pairs from Variables; empty values use an empty query value, as in rec_enabled=. In the source wget shell example, rec_enabled=\"\" represents an empty value after shell quote removal."
- id: http_list_supported_keys
  label: "Read the device configuration-key inventory"
  kind: "query"
  command: "GET /admin/http_api.cgi"
  description: "Page 177. Documented URL for viewing the list of keys supported by the device. It is under the admin interface; no response serialization is specified."
  params: []
```

## Feedbacks
```yaml
- id: recording_status
  type: "enum"
  values: ["RUNNING", "STOPPED", "UNINITIALIZED"]
  description: "STATUS query reports recording status for each channel; the manual does not specify delimiters or channel labels."
- id: free_storage_bytes
  type: "integer"
  unit: "bytes"
  description: "FREESPACE result. Response prefix and framing are not specified."
- id: recording_elapsed_time
  type: "string"
  description: "RECTIME reports elapsed recording time for the current file on each channel; units and wire formatting are unresolved."
- id: parameter_value
  type: "string"
  description: "GET returns the saved value of the selected parameter. HTTP get_params.cgi reads requested parameters. The manual does not specify a general response serialization."
```

## Variables
```yaml
- id: firmware_version
  type: "string"
  description: "Device firmware version; the Values cell says the string includes FIRMWARE_VERSION=. System-level key: channel number may be omitted."
  source: "May 2014 v3.12.0 manual, printed page 177."
  read_only: true
- id: mac_address
  type: "string"
  description: "Device MAC address. System-level key: channel number may be omitted."
  source: "May 2014 v3.12.0 manual, printed page 177."
  read_only: true
- id: product_name
  type: "string"
  description: "Product name. System-level key: channel number may be omitted."
  source: "May 2014 v3.12.0 manual, printed page 177."
  read_only: true
- id: vendor
  type: "string"
  description: "Vendor name; always Epiphan Systems Inc. System-level key: channel number may be omitted."
  source: "May 2014 v3.12.0 manual, printed page 177."
  read_only: true
- id: frmcheck_enabled
  type: "enum"
  description: "Automatic firmware update checking: on enables; empty string disables. System-level key: channel number may be omitted."
  source: "May 2014 v3.12.0 manual, printed page 177."
  values: ["on", ""]
- id: rec_enabled
  type: "enum"
  description: "Recording: on enables; empty string disables."
  source: "May 2014 v3.12.0 manual, printed page 178."
  values: ["on", ""]
- id: rec_format
  type: "enum"
  description: "Recording file format."
  source: "May 2014 v3.12.0 manual, printed page 178."
  values: ["avi", "mov", "ts"]
- id: rec_prefix
  type: "string"
  description: "Prefix for recording filenames."
  source: "May 2014 v3.12.0 manual, printed page 178."
- id: rec_sizelimit
  type: "integer"
  description: "Recording file size limit in kilobytes (kB)."
  source: "May 2014 v3.12.0 manual, printed page 178."
  unit: "kB"
- id: rec_stop_if_no_signal
  type: "enum"
  description: "on stops recording when there is no signal; empty string continues recording without signal."
  source: "May 2014 v3.12.0 manual, printed page 178."
  values: ["on", ""]
- id: rec_timelimit
  type: "integer"
  description: "Time in seconds before creating a new recording file."
  source: "May 2014 v3.12.0 manual, printed page 178."
  unit: "seconds"
- id: http_port
  type: "integer"
  description: "HTTP server port. The table supplies no default or range."
  source: "May 2014 v3.12.0 manual, printed page 178."
- id: http_sport
  type: "integer"
  description: "HTTPS server port. The table supplies no default or range."
  source: "May 2014 v3.12.0 manual, printed page 178."
- id: http_usessl
  type: "enum"
  description: "HTTPS server: description says on enables and empty string disables. UNRESOLVED: the same table incorrectly or inconsistently labels its Values cell integer; these strings follow the explicit enable/disable instructions."
  source: "May 2014 v3.12.0 manual, printed page 178."
  values: ["on", ""]
- id: allowips
  type: "string"
  description: "Comma-separated IP addresses and/or ranges to permit; empty string clears this restriction."
  source: "May 2014 v3.12.0 manual, printed page 179."
- id: denyips
  type: "string"
  description: "Comma-separated IP addresses and/or ranges to deny; empty string clears this restriction."
  source: "May 2014 v3.12.0 manual, printed page 179."
- id: share_archive
  type: "enum"
  description: "Recorded-file sharing by UPnP: on enables; empty string disables."
  source: "May 2014 v3.12.0 manual, printed page 179."
  values: ["on", ""]
- id: share_livestreams
  type: "enum"
  description: "Live-stream sharing by UPnP: on enables; empty string disables."
  source: "May 2014 v3.12.0 manual, printed page 179."
  values: ["on", ""]
- id: server_name
  type: "string"
  description: "UPnP server name; empty string uses the device name."
  source: "May 2014 v3.12.0 manual, printed page 179."
- id: gain
  type: "integer"
  description: "ADC gain: 0 brightest, 255 darkest."
  source: "May 2014 v3.12.0 manual, printed page 180."
  min: 0
  max: 255
- id: hshift
  type: "integer"
  description: "Horizontal shift: positive moves left, negative moves right."
  source: "May 2014 v3.12.0 manual, printed page 180."
  min: -999
  max: 999
- id: offset
  type: "integer"
  description: "ADC offset: 0 brightest, 63 darkest."
  source: "May 2014 v3.12.0 manual, printed page 180."
  min: 0
  max: 63
- id: phase
  type: "integer"
  description: "VGA phase adjustment; generally only use a value supplied by Epiphan support."
  source: "May 2014 v3.12.0 manual, printed page 180."
  min: 0
  max: 31
- id: pll
  type: "integer"
  description: "PLL adjustment; changes the number of pixels in the line."
  source: "May 2014 v3.12.0 manual, printed page 180."
  min: -999
  max: 999
- id: tune_interval
  type: "integer"
  description: "Number of auto-adjustments in the interval; 0 disables auto-adjustments."
  source: "May 2014 v3.12.0 manual, printed page 180."
  min: 0
  max: 9999
- id: vshift
  type: "integer"
  description: "Vertical shift: positive moves up, negative moves down."
  source: "May 2014 v3.12.0 manual, printed page 180."
  min: -20
  max: 20
- id: bcast_disabled
  type: "enum"
  description: "on disables the broadcast; empty string enables it. The meaning is inverted relative to enable flags."
  source: "May 2014 v3.12.0 manual, printed page 180."
  values: ["on", ""]
- id: rtsp_port
  type: "integer"
  description: "RTSP streaming port. Port 5557 is reserved for network discovery and must not be selected."
  source: "May 2014 v3.12.0 manual, printed page 180."
  min: 1000
  max: 65535
- id: streamport
  type: "integer"
  description: "Streaming port. Port 5557 is reserved for network discovery and must not be selected."
  source: "May 2014 v3.12.0 manual, printed page 180."
  min: 1000
  max: 65535
- id: autoframesize
  type: "enum"
  description: "on uses current signal resolution; empty string allows an explicitly selected frame size. Manually setting framesize switches this off."
  source: "May 2014 v3.12.0 manual, printed page 181."
  values: ["on", ""]
- id: codec
  type: "enum"
  description: "Stream codec."
  source: "May 2014 v3.12.0 manual, printed page 181."
  values: ["h.264", "mpeg4", "mjpeg"]
- id: fpslimit
  type: "integer"
  description: "Frames-per-second limit."
  source: "May 2014 v3.12.0 manual, printed page 181."
  min: 1
  max: 30
- id: framesize
  type: "enum"
  description: "Frame dimensions in pixels. Quote spaces in serial values; encode spaces as %20 in HTTP values. These are the sizes enumerated in Table 38."
  source: "May 2014 v3.12.0 manual, printed page 181."
  values: ["640 x 480", "720 x 400", "720 x 480", "720 x 576", "768 x 576", "1024 x 768", "1152 x 864", "1280 x 720", "1280 x 768", "1280 x 960", "1280 x 1024", "1360 x 768", "1360 x 1024", "1600 x 1200", "1920 x 1200"]
- id: nosignal
  type: "string"
  description: "on uses the default No Signal message; an already-uploaded filename uses a custom message; empty string disables the message."
  source: "May 2014 v3.12.0 manual, printed page 181."
- id: timelabel
  type: "enum"
  description: "none = no label; date = date; hms = time; date_hms = date and time; hms_ms = time to milliseconds; date_hms_ms = date and time to milliseconds."
  source: "May 2014 v3.12.0 manual, printed page 182."
  values: ["none", "date", "hms", "date_hms", "hms_ms", "date_hms_ms"]
- id: slicemode
  type: "enum"
  description: "H.264 slicing for RTP: on enables; empty string disables."
  source: "May 2014 v3.12.0 manual, printed page 182."
  values: ["on", ""]
- id: vbitrate
  type: "string"
  description: "Video bitrate. The table accepts an integer or suffixed integerK/integerM (examples 64K and 1M) and describes the unit as kbit/s. UNRESOLVED: page 173 describes vbitrate=256K as 256,000, so unit scaling for bare/suffixed values is not unambiguously specified."
  source: "May 2014 v3.12.0 manual, printed page 182."
- id: vbufmode
  type: "enum"
  description: "1 = low delay for streaming; 2 = storage, recommended for recording."
  source: "May 2014 v3.12.0 manual, printed page 182."
  values: [1, 2]
- id: vencpreset
  type: "enum"
  description: "0 = default/balanced; 1 = high quality; 2 = high speed."
  source: "May 2014 v3.12.0 manual, printed page 182."
  values: [0, 1, 2]
- id: videosource
  type: "string"
  description: "Video source string for multi-channel devices; value grammar is not specified in this table."
  source: "May 2014 v3.12.0 manual, printed page 182."
- id: vprofile
  type: "enum"
  description: "H.264 profile: 66 = Baseline; 77 = Main; 100 = High."
  source: "May 2014 v3.12.0 manual, printed page 182."
  values: [66, 77, 100]
- id: qvalue
  type: "integer"
  description: "M-JPEG video quality."
  source: "May 2014 v3.12.0 manual, printed page 182."
  min: 0
  max: 100
- id: logo_margin_x
  type: "integer"
  description: "Logo horizontal offset in pixels relative to logo_position; range 0 through frame width."
  source: "May 2014 v3.12.0 manual, printed page 183."
  min: 0
- id: logo_margin_y
  type: "integer"
  description: "Logo vertical offset in pixels relative to logo_position; range 0 through frame height."
  source: "May 2014 v3.12.0 manual, printed page 183."
  min: 0
- id: logo_position
  type: "enum"
  description: "lt = left-top; lb = left-bottom; rt = right-top; rb = right-bottom."
  source: "May 2014 v3.12.0 manual, printed page 183."
  values: ["lt", "lb", "rt", "rb"]
- id: logo_src
  type: "string"
  description: "Logo filename; file must already be uploaded."
  source: "May 2014 v3.12.0 manual, printed page 183."
- id: bgcolor
  type: "string"
  description: "Background color for video outside picture-in-picture modes; six hexadecimal digits RRGGBB."
  source: "May 2014 v3.12.0 manual, printed page 183."
- id: pip_layout
  type: "enum"
  description: "0 = independent streams; 1 = video left and inside VGA; 2 = video right and inside VGA; 3 = video left and outside VGA; 4 = video right and outside VGA."
  source: "May 2014 v3.12.0 manual, printed page 183."
  values: [0, 1, 2, 3, 4]
- id: audio
  type: "enum"
  description: "Audio for the stream: on enables; empty string disables."
  source: "May 2014 v3.12.0 manual, printed page 184."
  values: ["on", ""]
- id: audiochannels
  type: "enum"
  description: "1 = mono; 2 = stereo."
  source: "May 2014 v3.12.0 manual, printed page 184."
  values: [1, 2]
- id: audiopreset
  type: "string"
  description: "CODEC;RATE. Table 41 literally lists codecs pcm_s161e (PCM), pcm_alaw (G.711 a-law), pcm_mulaw (G.711 u-law), libmp3lame (MP3), libfacc (AAC), and rates 32, 64, 96, 112, 128, 160, 192. Its example is libfaac;128. UNRESOLVED: libfacc conflicts with libfaac, and pcm_s161e is the literal table spelling; do not silently correct either token or treat an alternative spelling as verified."
  source: "May 2014 v3.12.0 manual, printed page 184."
- id: publish_type
  type: "enum"
  description: "0 = do not publish; 1 = Epiphan.tv; 2 = RTSP Announce; 3 = multicast RTP/UDP; 4 = multicast MPEG-TS over UDP; 5 = multicast MPEG-TS over RTP/UDP; 6 = RTMP push."
  source: "May 2014 v3.12.0 manual, printed page 185."
  values: [0, 1, 2, 3, 4, 5, 6]
- id: announce_by_tcp
  type: "enum"
  description: "For publish_type=2, on enables RTSP over TCP; empty string disables TCP transport."
  source: "May 2014 v3.12.0 manual, printed page 185."
  values: ["on", ""]
- id: announce_host
  type: "string"
  description: "RTSP server address for publish_type=2; RTMP server address for publish_type=6."
  source: "May 2014 v3.12.0 manual, printed page 185-186."
- id: announce_name
  type: "string"
  description: "RTSP resource name for publish_type=2; RTMP resource name for publish_type=6."
  source: "May 2014 v3.12.0 manual, printed page 185,187."
- id: announce_password
  type: "string"
  description: "RTSP or RTMP server user password, according to publish_type=2 or 6."
  source: "May 2014 v3.12.0 manual, printed page 185,187."
- id: announce_port
  type: "integer"
  description: "RTSP or RTMP server port for publish_type=2 or 6; 5557 is reserved for discovery and excluded."
  source: "May 2014 v3.12.0 manual, printed page 185,187."
  min: 1000
  max: 65535
- id: announce_username
  type: "string"
  description: "RTSP or RTMP server username, according to publish_type=2 or 6."
  source: "May 2014 v3.12.0 manual, printed page 185,187."
- id: unicast_address
  type: "string"
  description: "Unicast/multicast IP address for RTP/UDP (publish_type=3) or MPEG-TS (publish_type=4/5)."
  source: "May 2014 v3.12.0 manual, printed page 186."
- id: unicast_aport
  type: "integer"
  description: "RTP/UDP audio port for publish_type=3. Port 5557 is reserved for discovery and excluded."
  source: "May 2014 v3.12.0 manual, printed page 186."
  min: 1000
  max: 65535
- id: unicast_vport
  type: "integer"
  description: "RTP/UDP video port for publish_type=3. Port 5557 is reserved for discovery and excluded."
  source: "May 2014 v3.12.0 manual, printed page 186."
  min: 1000
  max: 65535
- id: unicast_mport
  type: "integer"
  description: "MPEG-TS UDP port for publish_type=4/5. Port 5557 is reserved for discovery and excluded."
  source: "May 2014 v3.12.0 manual, printed page 186."
  min: 1000
  max: 65535
- id: author
  type: "string"
  description: "Author name for broadcast-video metadata. Quote spaces for serial; use %20 for HTTP."
  source: "May 2014 v3.12.0 manual, printed page 187."
- id: comment
  type: "string"
  description: "Comment for broadcast-video metadata. Quote spaces for serial; use %20 for HTTP."
  source: "May 2014 v3.12.0 manual, printed page 187."
- id: copyright
  type: "string"
  description: "Copyright information for broadcast-video metadata. Quote spaces for serial; use %20 for HTTP."
  source: "May 2014 v3.12.0 manual, printed page 187."
- id: title
  type: "string"
  description: "Title for broadcast-video metadata. Quote spaces for serial; use %20 for HTTP."
  source: "May 2014 v3.12.0 manual, printed page 187."
- id: streamtype
  type: "enum"
  description: "Only the value 2 = ASF is established by the examples on pages 173-174. This key is absent from Tables 30-47; other values are unresolved."
  source: "May 2014 v3.12.0 manual, printed page 173-174."
  values: [2]
```

All keys above are from Tables 30-47 except `streamtype`, whose only established value is the ASF example. Repeated publishing keys share one variable entry with each documented context. Read-only system keys must not be passed to either SET operation. For the remaining keys, use the supported values and context shown; this list does not establish a general channel-selection syntax.

## Events
```yaml
- id: recording_status_changed
  type: enum
  values: ["Running", "Stopped", "Uninitialized"]
  description: "Table 29, page 171: unsolicited serial message STATUS.<status>. The notification values have the capitalization shown here; query status values are separately printed in uppercase. Uninitialized indicates an internal error; inspect the device for details. Notification terminator and channel labeling are not specified."
```

## Macros
```yaml
- id: set_frame_size_and_save
  label: Set frame size to 640 x 480 and save
  description: 'Page 172 sequence: SET.framesize="640 x 480" followed by SAVECFG. Terminate each command with LF.'
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- Source: [Lecture Recorder x2 User Guide, version 3.12.0, May 20, 2014](https://www.epiphan.com/wp-content/uploads/2015/06/epiphan-lecture-recorder-x2-userguide.pdf), sections 7-7, 7-8, and 7-9, printed pages 169-187 (PDF pages 178-196). The source cover establishes the version scope, not a compatibility range.
- Channel syntax is internally incomplete: Table 28 and page 172 show `GET.<key>` and `SET.<key>=<value>`, with examples `GET.framesize` and `SET.framesize="640 x 480"`. Page 176 instead illustrates `SET.2.framesize="640 x 480"`. Page 177 says channel numbers may be omitted for system-level keys. The draft preserves the documented forms but does not infer `GET.{channel}.{key}`, HTTP channel parameters, or channel suffixes for START/STOP/STATUS. Confirm intended channel targeting using the supported-key page or the manufacturer before deploying channel-specific control.
- Serial `START` is not idempotent while recording: it closes the existing file and opens another. `SNAPSHOT` is supported only with Motion JPEG. `SET` changes require `SAVECFG` for saving; `GET` is explicitly described as returning the saved value.
- Serial values with spaces are quoted, as in `SET.framesize="640 x 480"`; an empty value is `SET.audio=""`. HTTP spaces use `%20`, as in `/admin/set_params.cgi?framesize=640%20x%20480`. The source's shell example `rec_enabled=""` becomes an empty HTTP query value after shell quote removal; literal quote characters are not sent.
- HTTP examples: `/admin/get_params.cgi?product_name&firmware_version`; `/admin/set_params.cgi?streamtype=2&vbitrate=256K`; `/admin/set_params.cgi?rec_enabled=on`; `/admin/set_params.cgi?rec_enabled=`. No extra HTTP save endpoint is documented.
- Configuration-key spelling follows the 2014 tables: `vbitrate`, `fpslimit`, and numeric `vbufmode` values 1 and 2. Earlier spellings or values are not carried forward. Wrapped table names are joined without adding characters, e.g. `frmcheck_enabled`, `rec_stop_if_no_signal`, `announce_password`, and `announce_username`.
- Source conflicts remain unresolved: `http_usessl` is labeled integer but its description says on/empty string; `vbitrate` has inconsistent unit wording between its table and example; audio codec table tokens `pcm_s161e` and `libfacc` are reproduced as printed, while the AAC example uses `libfaac;128`. No corrected spelling is promoted as verified.
- The HTTP examples contain one incidental reference to VGADVI Broadcaster Pro. The manual cover and the surrounding API sections identify Lecture Recorder x2; that stray reference is not evidence of another model's compatibility.
- These sections do not define serial data bits, default flow control, complete response framing, recording-time units, or HTTP authentication scheme. Status-change notifications use `STATUS.<status>` rather than the older RECTL/MICVOLUME/PCMVOLUME feedback. No physical-device testing was performed.
<!-- UNRESOLVED: general channel-selection grammar; serial data bits; flow-control default; response framing and recording-time units; HTTP authentication scheme and default port; conflicting audio codec spellings and bitrate units. -->

## Provenance

```yaml
source_domains:
  - epiphan.com
source_urls:
  - https://www.epiphan.com/wp-content/uploads/2015/06/epiphan-lecture-recorder-x2-userguide.pdf
retrieved_at: 2026-09-26T14:23:17.517Z
last_checked_at: 2026-09-26T14:23:17.517Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:17.517Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 command families and 67 keys match the Lecture Recorder x2 v3.12.0 guide; unresolved source grammar and conflicting values remain explicit. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "omitted from this version's serial settings."
- "default HTTP port is not stated in the cited API sections."
- "the manual does not establish Basic versus Digest authentication."
- "the same table incorrectly or inconsistently labels its Values cell integer; these strings follow the explicit enable/disable instructions.\""
- "page 173 describes vbitrate=256K as 256,000, so unit scaling for bare/suffixed values is not unambiguously specified.\""
- "libfacc conflicts with libfaac, and pcm_s161e is the literal table spelling; do not silently correct either token or treat an alternative spelling as verified.\""
- "general channel-selection grammar; serial data bits; flow-control default; response framing and recording-time units; HTTP authentication scheme and default port; conflicting audio codec spellings and bitrate units."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
